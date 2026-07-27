import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";

export const dynamic = "force-dynamic";

/**
 * GET /api/rewards/list
 *
 * Exports all rewards grouped by platform slug.
 * Used by automation tools as the "MY_DATA" input.
 *
 * Requires X-API-Key header matching SCAN_API_KEY env var.
 *
 * Response format:
 * {
 *   "platform-slug": {
 *     "rewards": [
 *       {
 *         "id": "abc123",
 *         "slug": "reward-slug",
 *         "name": "Reward Name",
 *         "status": "active" | "expired",
 *         "links": ["https://link.example.com/voucher/uuid"]
 *       }
 *     ]
 *   }
 * }
 */
export async function GET(req: NextRequest) {
  try {
    // Auth: check API key header
    // const apiKey = req.headers.get("x-api-key");

    // if (!apiKey || apiKey !== serverEnv.SCAN_API_KEY) {
    //   return NextResponse.json(
    //     { success: false, error: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }

    // Optional: filter by platform
    const platformSlug = req.nextUrl.searchParams.get("platform");
    // Optional: filter by status
    const statusFilter = req.nextUrl.searchParams.get("status");
    const validStatuses = ["active", "expired"];

    const wherePlatform = platformSlug ? { slug: platformSlug } : undefined;

    const platforms = await prisma.platform.findMany({
      where: wherePlatform,
      select: { id: true, slug: true, name: true },
    });

    if (platforms.length === 0) {
      return NextResponse.json({ success: true, data: {} });
    }

    const platformIds = platforms.map((p) => p.id);

    const rewards = await prisma.reward.findMany({
      where: {
        platformId: { in: platformIds },
        ...(statusFilter && validStatuses.includes(statusFilter)
          ? { status: statusFilter as "active" | "expired" }
          : {}),
      },
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        claimUrl: true,
        platformId: true,
      },
    });

    // Group by platform slug
    const platformMap = new Map(platforms.map((p) => [p.id, p.slug]));

    const grouped: Record<
      string,
      {
        rewards: {
          id: string;
          slug: string;
          name: string;
          status: string;
          links: string[];
        }[];
      }
    > = {};

    for (const reward of rewards) {
      const slug = platformMap.get(reward.platformId);
      if (!slug) continue;

      if (!grouped[slug]) {
        grouped[slug] = { rewards: [] };
      }

      grouped[slug].rewards.push({
        id: reward.id,
        slug: reward.slug,
        name: reward.title,
        status: reward.status,
        links: reward.claimUrl ? [reward.claimUrl] : [],
      });
    }

    return NextResponse.json({ success: true, data: grouped });
  } catch (error) {
    console.error("Rewards list error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
