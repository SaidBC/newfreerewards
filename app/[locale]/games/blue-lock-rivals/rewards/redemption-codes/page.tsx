import { storageUrl } from "@/lib/storage";
import RewardEngagementBar from "@/components/rewards/RewardEngagementBar";
import CopyCode from "@/components/CopyCode";
import { getRewardBySlug } from "@/lib/rewardService";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { ArrowLeft, Gift } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const path = `/games/blue-lock-rivals/rewards/redemption-codes`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.blueLockRivalsTitle,
    description: t.seo.blueLockRivalsDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.blueLockRivalsTitle,
      description: t.seo.blueLockRivalsDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: [storageUrl("images/blue-lock-rivals/logo.png")],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.blueLockRivalsTitle,
      description: t.seo.blueLockRivalsDescription,
      images: [storageUrl("images/blue-lock-rivals/logo.png")],
    },
  };
}

export default async function BlueLockRivalsRedemptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);
  const reward = await getRewardBySlug("blue-lock-rivals", "redemption-codes", locale);

  return (
    <main className="min-h-screen bg-background pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Navigation */}
        <Button variant={"link"} asChild className="mb-4 -ml-4">
          <Link
            prefetch={false}
            href={localizePath(locale, "/games/blue-lock-rivals")}
            data-trigger-popunder="true"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t.games.back}</span>
          </Link>
        </Button>

        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl">
            <Image
              src={storageUrl("images/blue-lock-rivals/logo.png")}
              fill
              className="object-cover"
              alt="Blue Lock Rivals"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-concert-one text-4xl md:text-5xl uppercase tracking-tight">
              {t.games.blueLockRivalsTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.games.blueLockRivalsDescription}
            </p>
          </div>
        </div>

        {reward && <RewardEngagementBar rewardId={reward.id} locale={locale} />}

        {/* Content Section */}
        <article className="space-y-12 leading-relaxed">
          {/* Working Codes */}
          <section className="rounded-3xl border bg-card/50 p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Active Blue Lock Rivals Codes (April 2026)</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reward?.content?.filter((b: any) => b.type === "code").map((block: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{block.value}</span>
                  <CopyCode text={block.value || ""} />
                  {block.label && <p className="text-xs text-muted-foreground">{block.label}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* How to Redeem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">How to Claim Your Rewards</h2>
            <div className="grid gap-6 md:grid-cols-1">
              <div className="rounded-2xl border p-6">
                <h3 className="mb-4 font-bold text-primary">In-Game Redemption Steps</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Before redeeming, ensure you've joined the <strong>Blue Lock Rivals Roblox group</strong> and reached <strong>Level 10</strong>.
                </p>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>Launch <strong>Blue Lock Rivals</strong> on Roblox.</li>
                  <li>In the main lobby, look for the <strong>Codes</strong> option in the bottom menu.</li>
                  <li>Enter one of the working codes into the <strong>‘Enter Code..’</strong> field.</li>
                  <li>Press <strong>Redeem</strong> to instantly claim your free spins or flow.</li>
                </ol>
              </div>
            </div>
            <div className="mt-8 rounded-2xl bg-muted/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Rewards are credited immediately to your profile once the code is successfully redeemed.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
