import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminUploadForm } from "@/components/admin/AdminUploadForm";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminUploadPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  const platforms = await prisma.platform.findMany({
    select: { slug: true },
    orderBy: { name: "asc" },
  });

  const suggestedFolders = Array.from(
    new Set([
      "images/uploads",
      "images/affiliate",
      "images/platforms",
      "images/rewards",
      ...platforms.map((platform) => `images/${platform.slug}`),
    ])
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Upload assets</h2>
          <p className="text-muted-foreground">
            Upload images to Cloudinary and keep them organized by folder.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/admin" prefetch={false}>
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </Button>
      </div>

      <AdminUploadForm suggestedFolders={suggestedFolders} />
    </div>
  );
}
