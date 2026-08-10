import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import RewardEditorPage from "@/components/admin/RewardEditorPage";
import { notFound } from "next/navigation";
import { dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Wand2 } from "lucide-react";
import { getTemplateBlocks, TEMPLATES } from "@/lib/rewardTemplates";
import type { RewardPrefill } from "@/components/admin/RewardForm";

interface EditRewardPageProps {
  params: Promise<{
    platformSlug: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const dynamic = "force-dynamic";

export default async function EditRewardPage({
  params,
  searchParams,
}: EditRewardPageProps) {
  const { platformSlug, slug } = await params;
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const ADMIN_PASSWORD = serverEnv.ADMIN_PASSWORD;

  if (auth !== ADMIN_PASSWORD) {
    return <AdminLoginForm />;
  }

  const reward = await prisma.reward.findFirst({
    where: {
      slug,
      platform: { slug: platformSlug },
    },
    include: { platform: true },
  });
  if (!reward || reward.platform.slug !== platformSlug) {
    return notFound();
  }

  const [platforms, contents] = await Promise.all([
    prisma.platform.findMany({ orderBy: { name: "asc" } }),
    prisma.rewardContent.findMany({
      where: { rewardId: String(reward.id) },
      orderBy: { order: "asc" },
    }),
  ]);
  console.log(contents);
  // Convert contents to plain JSON-safe objects for client component
  const initialContents = contents.map((c) => ({
    id: String(c.id),
    type: c.type as string,
    value: c.value ?? "",
    href: c.href ?? "",
    label: c.label ?? "",
    imageSrc: c.imageSrc ?? "",
    imageAlt: c.imageAlt ?? "",
    order: c.order,
    translations: (c.translations as any) ?? {},
    rewardId: String(c.rewardId),
    createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : null,
  }));
  // Check for template selection from query params
  const params2 = await searchParams;
  const single = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const templateParam = single(params2.template);
  const selectedTemplate =
    templateParam === "SUPERCELL_CODE" || templateParam === "QR_CODE"
      ? templateParam
      : undefined;

  // If template selected, generate template content blocks using the reward's platform name
  const templateContentBlocks = selectedTemplate
    ? getTemplateBlocks(
        selectedTemplate as any,
        reward.platform.name,
        reward.claimUrl || undefined,
      )
    : [];

  const prefill: RewardPrefill | undefined = selectedTemplate
    ? {
        title: reward.title,
        slug: reward.slug,
        claimUrl: reward.claimUrl || "",
        platformId: reward.platformId,
        description: reward.description,
        contentBlocks: templateContentBlocks,
      }
    : undefined;

  const currentTemplate = reward.template
    ? (TEMPLATES.find((t) => t.id === reward.template)?.name ?? "None")
    : "None";

  // URL to clear template application
  const clearTemplateUrl = `?clear=1`;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto py-6 px-4 h-screen flex flex-col">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin" prefetch={false}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Edit Reward: <span className="text-primary">{reward.title}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Platform: {reward.platform.name} • Slug: {reward.slug}
            </p>
          </div>
        </div>

        {/* Apply Template Section */}
        <div className="flex items-center gap-2">
          {selectedTemplate ? (
            <>
              <div className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/5 px-3 py-1.5 text-sm text-blue-700 dark:text-blue-400">
                <Wand2 className="h-4 w-4" />
                Template applied:{" "}
                {selectedTemplate === "SUPERCELL_CODE"
                  ? "Supercell Code"
                  : "QR Code"}
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={clearTemplateUrl} prefetch={false}>
                  Clear
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Apply template:
              </span>
              {TEMPLATES.filter((t) => t.id !== "NONE").map((template) => (
                <Button key={template.id} variant="outline" size="sm" asChild>
                  <Link
                    href={`?template=${template.id}`}
                    prefetch={false}
                    className="flex items-center gap-1"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    {template.name}
                  </Link>
                </Button>
              ))}
              {reward.template && reward.template !== "NONE" && (
                <span className="text-xs text-muted-foreground ml-2">
                  Current: {currentTemplate}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <RewardEditorPage
          platforms={platforms}
          reward={reward}
          initialContents={initialContents}
          prefill={prefill}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
}
