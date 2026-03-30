import { getRewardsByPlatform, type TranslatedRewards } from "@/lib/rewardService";
import { NextRequest, NextResponse } from "next/server";

type RewardsApiResponse =
  | { success: true; data: TranslatedRewards }
  | { success: false; message: string };

export async function GET(req:NextRequest) {
    const platform = req.nextUrl.searchParams.get("platform");
    const locale = req.nextUrl.searchParams.get("locale");

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
    const getRewards = await getRewardsByPlatform(platform, locale);
    return NextResponse.json<RewardsApiResponse>({ success: true, data: getRewards });
}
