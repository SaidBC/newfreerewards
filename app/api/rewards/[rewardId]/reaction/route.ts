import { ReactionType } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import z from "zod";
import { RewardEngagementError, toggleRewardReaction } from "@/lib/rewardEngagementService";
import {
  applyVisitorIdCookie,
  getOrCreateVisitorId,
  VISITOR_ID_COOKIE_NAME,
} from "@/lib/visitorId";

const reactionSchema = z.object({
  reactionType: z.nativeEnum(ReactionType),
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
  try {
    const { rewardId: rewardIdParam } = await context.params;
    const rewardId = parseRewardId(rewardIdParam);
    const body = reactionSchema.parse(await req.json());
    const cookieStore = await cookies();
    const { visitorId, shouldSetCookie } = getOrCreateVisitorId(
      cookieStore.get(VISITOR_ID_COOKIE_NAME)?.value,
    );

    const summary = await toggleRewardReaction(rewardId, visitorId, body.reactionType);
    // @ts-expect-error - Next.js 16 experimental profile argument
    revalidateTag("reward-engagement");
    const response = NextResponse.json(summary);

    if (shouldSetCookie) {
      applyVisitorIdCookie(response, visitorId);
    }

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid reaction type", code: "INVALID_REACTION_TYPE" },
        { status: 400 },
      );
    }

    if (error instanceof RewardEngagementError) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "Failed to update reaction", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
