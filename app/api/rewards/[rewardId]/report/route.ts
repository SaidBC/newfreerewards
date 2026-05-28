import { ReportType } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import z from "zod";
import {
  getRewardEngagement,
  RewardEngagementError,
  submitRewardReport,
} from "@/lib/rewardEngagementService";
import {
  applyVisitorIdCookie,
  getOrCreateVisitorId,
  VISITOR_ID_COOKIE_NAME,
} from "@/lib/visitorId";

const reportSchema = z.object({
  reportType: z.nativeEnum(ReportType),
  note: z.string().trim().max(1000).optional(),
}).superRefine((value, ctx) => {
  if (value.reportType === ReportType.other && !value.note) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "A note is required for other reports",
      path: ["note"],
    });
  }
});

function parseRewardId(value: string) {
  const rewardId = value.trim();
  if (!rewardId) {
    throw new RewardEngagementError("Invalid reward id", 400, "INVALID_REWARD_ID");
  }

  return rewardId;
}

export async function POST(
  req: Request,
  context: { params: Promise<{ rewardId: string }> },
) {
  const cookieStore = await cookies();
  const { visitorId, shouldSetCookie } = getOrCreateVisitorId(
    cookieStore.get(VISITOR_ID_COOKIE_NAME)?.value,
  );

  try {
    const { rewardId: rewardIdParam } = await context.params;
    const rewardId = parseRewardId(rewardIdParam);
    const body = reportSchema.parse(await req.json());

    const summary = await submitRewardReport(
      rewardId,
      visitorId,
      body.reportType,
      body.note,
    );
    // @ts-expect-error - Next.js 16 experimental profile argument
    revalidateTag("reward-engagement");
    const response = NextResponse.json(summary);

    if (shouldSetCookie) {
      applyVisitorIdCookie(response, visitorId);
    }

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = NextResponse.json(
        { message: "Invalid report payload", code: "INVALID_REPORT_PAYLOAD" },
        { status: 400 },
      );

      if (shouldSetCookie) {
        applyVisitorIdCookie(response, visitorId);
      }

      return response;
    }

    if (error instanceof RewardEngagementError) {
      const { rewardId: rewardIdParam } = await context.params;
      const rewardId = rewardIdParam.trim();
      const summary = rewardId
        ? await getRewardEngagement(rewardId, visitorId).catch(() => null)
        : null;

      const response = NextResponse.json(
        {
          message: error.message,
          code: error.code,
          summary,
        },
        { status: error.status },
      );

      if (shouldSetCookie) {
        applyVisitorIdCookie(response, visitorId);
      }

      return response;
    }

    const response = NextResponse.json(
      { message: "Failed to submit report", code: "INTERNAL_ERROR" },
      { status: 500 },
    );

    if (shouldSetCookie) {
      applyVisitorIdCookie(response, visitorId);
    }

    return response;
  }
}
