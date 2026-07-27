import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { RewardForm, RewardPrefill } from "@/components/admin/RewardForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewRewardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const ADMIN_PASSWORD = serverEnv.ADMIN_PASSWORD;

  if (auth !== ADMIN_PASSWORD) {
    return <AdminLoginForm />;
  }

  const platforms = await prisma.platform.findMany({
    orderBy: { name: "asc" },
  });

  // Read optional prefill query params coming from the scan results page.
  const params = await searchParams;
  const single = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const prefillTitle = single(params.title);
  const prefillSlug = single(params.slug);
  const prefillClaimUrl = single(params.claimUrl);
  const prefillPlatformName = single(params.platformName);
  const prefillDescription = single(params.description);
  const isPrefill = single(params.fromScan) === "1";

  // Resolve the platform by name (case-insensitive) so the dropdown
  // auto-selects the matching game.
  let prefillPlatformId: string | undefined;
  if (prefillPlatformName) {
    const match = platforms.find(
      (p) => p.name.toLowerCase() === prefillPlatformName.toLowerCase(),
    );
    prefillPlatformId = match?.id;
  }

  const prefill: RewardPrefill | undefined = isPrefill
    ? {
        title: prefillTitle,
        slug: prefillSlug,
        claimUrl: prefillClaimUrl,
        platformId: prefillPlatformId,
        description: prefillDescription,
      }
    : undefined;

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin" prefetch={false}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create New Reward
          </h2>
          <p className="text-muted-foreground mt-1">
            Fill in the details to add a new reward to the platform.
          </p>
        </div>
      </div>

      {isPrefill && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          Form pre-filled from a scan result missing reward. Review and publish.
        </div>
      )}

      <RewardForm platforms={platforms} prefill={prefill} />
    </div>
  );
}
