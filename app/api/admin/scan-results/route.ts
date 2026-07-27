import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/scan-results
 *
 * Accepts scan results from automation tools (n8n, etc.).
 * Requires X-API-Key header matching SCAN_API_KEY env var.
 */
export async function POST(req: NextRequest) {
  try {
    // Auth: check API key header
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey || apiKey !== serverEnv.SCAN_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    console.log(body);
    // Validate required fields
    if (!body.scanSummary || !body.sourceUrls) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: scanSummary, sourceUrls",
        },
        { status: 400 },
      );
    }

    const scanResult = await prisma.scanResult.create({
      data: {
        status: "COMPLETED",
        sourceUrls: body.sourceUrls,
        platformSlug: body.platformSlug || null,
        summary: body.scanSummary,
        missingRewards: body.missingRewards || [],
        expiredRewards: body.possiblyExpiredRewards || [],
        matches: body.matches || [],
        rawOutput: body,
        error: null,
        apiKeyName: body.apiKeyName || null,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: { id: scanResult.id },
    });
  } catch (error) {
    console.error("Scan result error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * GET /api/admin/scan-results
 *
 * Lists all scan results (admin only - cookie auth).
 */
export async function GET(req: NextRequest) {
  try {
    const cookieAuth = req.cookies.get("admin_auth")?.value;

    if (cookieAuth !== serverEnv.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      prisma.scanResult.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.scanResult.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: results,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Scan results list error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
