import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getRewardEngagement, RewardEngagementError } from "@/lib/rewardEngagementService";
import {
  applyVisitorIdCookie,
  getOrCreateVisitorId,
  VISITOR_ID_COOKIE_NAME,
} from "@/lib/visitorId";

function parseRewardId(value: string) {
  const rewardId = Number(value);
  if (!Number.isInteger(rewardId) || rewardId <= 0) {
    throw new RewardEngagementError("Invalid reward id", 400, "INVALID_REWARD_ID");
  }

  return rewardId;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ rewardId: string }> },
) {
  try {
    const { rewardId: rewardIdParam } = await context.params;
    const rewardId = parseRewardId(rewardIdParam);
    const cookieStore = await cookies();
    const { visitorId, shouldSetCookie } = getOrCreateVisitorId(
      cookieStore.get(VISITOR_ID_COOKIE_NAME)?.value,
    );

    const summary = await getRewardEngagement(rewardId, visitorId);
    const response = NextResponse.json(summary);

    if (shouldSetCookie) {
      applyVisitorIdCookie(response, visitorId);
    }

    return response;
  } catch (error) {
    if (error instanceof RewardEngagementError) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "Failed to load engagement", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
