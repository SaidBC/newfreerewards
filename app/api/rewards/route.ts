import { getRewardsByPlatform, type TranslatedRewards } from "@/lib/rewardService";
import { NextRequest, NextResponse } from "next/server";
import { RewardStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

type RewardsApiResponse =
  | { success: true; data: TranslatedRewards }
  | { success: false; message: string };

export async function GET(req:NextRequest) {
    const platform = req.nextUrl.searchParams.get("platform");
    const locale = req.nextUrl.searchParams.get("locale");
    const status = req.nextUrl.searchParams.get("status") as RewardStatus | null;

    if(!platform || !locale){
        return NextResponse.json<RewardsApiResponse>(
          { success: false, message: "Platform and locale are required" },
          { status: 400 }
        );
    }
    if (locale !== "en" && locale !== "es" && locale !== "ar"){
        return NextResponse.json<RewardsApiResponse>(
          { success: false, message: "Invalid locale" },
          { status: 400 }
        );
    }

    const validStatus: RewardStatus = (status === "active" || status === "expired") ? status : "active";

    const getRewards = await getRewardsByPlatform(platform, locale, validStatus);
    return NextResponse.json<RewardsApiResponse>({ success: true, data: getRewards });
}
