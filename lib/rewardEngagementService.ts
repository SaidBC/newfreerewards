import { Prisma, ReactionType, ReportType } from "@prisma/client";
import { prisma } from "./prisma";

const NEEDS_REVIEW_THRESHOLD = 3;
const NEEDS_REVIEW_WINDOW_DAYS = 7;

export type RewardEngagementSummary = {
  rewardId: string;
  reactions: {
    love: number;
    dislike: number;
    viewerReaction: ReactionType | null;
  };
  reports: {
    expired: number;
    notWorking: number;
    other: number;
    viewerCanReport: boolean;
    viewerReportBlockedUntil: string | null;
    needsReview: boolean;
  };
};

export class RewardEngagementError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message);
  }
}

function startOfUtcDay(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function nextUtcDay(date = new Date()) {
  const start = startOfUtcDay(date);
  start.setUTCDate(start.getUTCDate() + 1);
  return start;
}

function getNeedsReviewWindowStart(date = new Date()) {
  const windowStart = new Date(date);
  windowStart.setUTCDate(windowStart.getUTCDate() - NEEDS_REVIEW_WINDOW_DAYS);
  return windowStart;
}

async function ensureRewardExists(rewardId: string) {
  const reward = await prisma.reward.findUnique({
    where: { id: rewardId },
    select: { id: true },
  });

  if (!reward) {
    throw new RewardEngagementError("Reward not found", 404, "REWARD_NOT_FOUND");
  }
}

export async function getRewardEngagement(
  rewardId: string,
  visitorId?: string,
): Promise<RewardEngagementSummary> {
  await ensureRewardExists(rewardId);

  const today = startOfUtcDay();
  const recentWindowStart = getNeedsReviewWindowStart();

  const result = await prisma.$transaction(async (tx) => {
    const [
      loveCount,
      dislikeCount,
      expiredCount,
      notWorkingCount,
      otherCount,
      recentReportsCount,
      viewerReaction,
      todayReport,
    ] = await Promise.all([
      tx.rewardReaction.count({
        where: { rewardId, reactionType: ReactionType.love },
      }),
      tx.rewardReaction.count({
        where: { rewardId, reactionType: ReactionType.dislike },
      }),
      tx.rewardReport.count({
        where: { rewardId, reportType: ReportType.expired },
      }),
      tx.rewardReport.count({
        where: { rewardId, reportType: ReportType.not_working },
      }),
      tx.rewardReport.count({
        where: { rewardId, reportType: ReportType.other },
      }),
      tx.rewardReport.count({
        where: {
          rewardId,
          createdAt: {
            gte: recentWindowStart,
          },
        },
      }),
      visitorId
        ? tx.rewardReaction.findUnique({
            where: {
              rewardId_visitorId: {
                rewardId,
                visitorId,
              },
            },
            select: { reactionType: true },
          })
        : Promise.resolve(null),
      visitorId
        ? tx.rewardReport.findUnique({
            where: {
              rewardId_visitorId_reportDay: {
                rewardId,
                visitorId,
                reportDay: today,
              },
            },
            select: { id: true },
          })
        : Promise.resolve(null),
    ]);

    return {
      loveCount,
      dislikeCount,
      expiredCount,
      notWorkingCount,
      otherCount,
      recentReportsCount,
      viewerReaction,
      todayReport,
    };
  });

  const canReport = !result.todayReport;

  return {
    rewardId,
    reactions: {
      love: result.loveCount,
      dislike: result.dislikeCount,
      viewerReaction: result.viewerReaction?.reactionType ?? null,
    },
    reports: {
      expired: result.expiredCount,
      notWorking: result.notWorkingCount,
      other: result.otherCount,
      viewerCanReport: canReport,
      viewerReportBlockedUntil: canReport ? null : nextUtcDay().toISOString(),
      needsReview: result.recentReportsCount >= NEEDS_REVIEW_THRESHOLD,
    },
  };
}

export async function toggleRewardReaction(
  rewardId: string,
  visitorId: string,
  reactionType: ReactionType,
) {
  await ensureRewardExists(rewardId);

  const existingReaction = await prisma.rewardReaction.findUnique({
    where: {
      rewardId_visitorId: {
        rewardId,
        visitorId,
      },
    },
  });

  if (!existingReaction) {
    await prisma.rewardReaction.create({
      data: {
        rewardId,
        visitorId,
        reactionType,
      },
    });
  } else if (existingReaction.reactionType === reactionType) {
    await prisma.rewardReaction.delete({
      where: {
        rewardId_visitorId: {
          rewardId,
          visitorId,
        },
      },
    });
  } else {
    await prisma.rewardReaction.update({
      where: {
        rewardId_visitorId: {
          rewardId,
          visitorId,
        },
      },
      data: {
        reactionType,
      },
    });
  }

  return getRewardEngagement(rewardId, visitorId);
}

export async function submitRewardReport(
  rewardId: string,
  visitorId: string,
  reportType: ReportType,
  note?: string,
) {
  await ensureRewardExists(rewardId);

  const reportDay = startOfUtcDay();

  try {
    await prisma.rewardReport.create({
      data: {
        rewardId,
        visitorId,
        reportType,
        reportDay,
        note: note?.trim() || null,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new RewardEngagementError(
        "You already reported this reward today",
        409,
        "ALREADY_REPORTED_TODAY",
      );
    }

    throw error;
  }

  return getRewardEngagement(rewardId, visitorId);
}
