import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { RewardForm, RewardPrefill } from "@/components/admin/RewardForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import RewardEditorPage from "@/components/admin/RewardEditorPage";
import { Reward, Platform } from "@prisma/client";
import { dictionary } from "@/lib/i18n";

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
  let selectedPlatform: Platform | undefined;
  if (prefillPlatformName) {
    const match = platforms.find(
      (p) => p.name.toLowerCase() === prefillPlatformName.toLowerCase(),
    );
    prefillPlatformId = match?.id;
    selectedPlatform = match;
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

  // Build a minimal stub reward for the editor/preview
  const stubReward: Reward & { platform: Platform } = {
    id: "new",
    title: prefillTitle || "New Reward",
    description: prefillDescription || "",
    platformId: prefillPlatformId || platforms[0]?.id || "",
    previewImage: "",
    slug: prefillSlug || "",
    status: "active",
    claimUrl: prefillClaimUrl || "",
    expiresAt: null,
    image: "",
    translations: null,
    platform: selectedPlatform || platforms[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as any;

  // Build initial content blocks from prefill claimUrl
  const initialContents = prefillClaimUrl
    ? [
        {
          id: "prefill-link",
          type: "link",
          value: "",
          href: prefillClaimUrl,
          label: "Claim Reward",
          imageSrc: "",
          imageAlt: "",
          order: 0,
          translations: { es: { label: "" }, ar: { label: "" } },
          rewardId: "new",
          createdAt: new Date().toISOString(),
        },
      ]
    : [];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto py-6 px-4 h-screen flex flex-col">
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

      <div className="flex-1 overflow-hidden">
        <RewardEditorPage
          platforms={platforms}
          reward={stubReward}
          initialContents={initialContents}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
}
