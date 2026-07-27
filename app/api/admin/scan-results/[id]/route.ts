import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";

export const dynamic = "force-dynamic";

/**
 * DELETE /api/admin/scan-results/[id]
 *
 * Deletes a scan result by ID.
 * Requires cookie-based admin auth.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieAuth = req.cookies.get("admin_auth")?.value;

    if (cookieAuth !== serverEnv.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    await prisma.scanResult.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete scan result error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
