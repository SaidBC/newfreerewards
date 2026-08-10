import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platformId = searchParams.get("platformId");
  const excludeId = searchParams.get("excludeId");
  const limit = parseInt(searchParams.get("limit") || "5");

  if (!platformId) {
    return NextResponse.json(
      { error: "platformId is required" },
      { status: 400 },
    );
  }

  try {
    const rewards = await prisma.reward.findMany({
      where: {
        platformId,
        status: "active",
        ...(excludeId && { id: { not: excludeId } }),
      },
      include: {
        platform: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ rewards });
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
      { status: 500 },
    );
  }
}
