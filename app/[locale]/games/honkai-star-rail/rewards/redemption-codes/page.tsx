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
import { ArrowLeft, Gift, Info, CheckCircle, ExternalLink } from "lucide-react";
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
  const reward = await getRewardBySlug("honkai-star-rail", "redemption-codes", locale);

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const path = `/games/honkai-star-rail/rewards/redemption-codes`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.honkaiStarRailTitle,
    description: t.seo.honkaiStarRailDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.honkaiStarRailTitle,
      description: t.seo.honkaiStarRailDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: [storageUrl("images/honkai-star-rail/logo.png")],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.honkaiStarRailTitle,
      description: t.seo.honkaiStarRailDescription,
      images: [storageUrl("images/honkai-star-rail/logo.png")],
    },
  };
}

export default async function HonkaiStarRailRedemptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);
  const reward = await getRewardBySlug("honkai-star-rail", "redemption-codes", locale);

  return (
    <main className="min-h-screen bg-background pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Navigation */}
        {/* Navigation */}
        <Button variant={"link"} asChild className="mb-4 -ml-4">
          <Link
            prefetch={false}
            href={localizePath(locale, "/games/honkai-star-rail")}
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
              src={storageUrl("images/honkai-star-rail/logo.png")}
              fill
              className="object-cover"
              alt="Honkai: Star Rail"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-concert-one text-4xl md:text-5xl uppercase tracking-tight">
              {t.games.honkaiStarRailTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.games.honkaiStarRailDescription}
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
              <h2 className="text-2xl font-bold">Active Honkai: Star Rail Codes (March 2026)</h2>
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

          {/* Livestream Section */}
          <section className="relative overflow-hidden rounded-3xl border bg-primary/5 p-6 md:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-primary/10 blur-2xl" />
            <div className="mb-6 flex items-center gap-3">
              <Info className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Honkai: Star Rail 4.1 Livestream Codes</h2>
            </div>
            <p className="mb-6 text-muted-foreground">
              Released during the Version 4.1 Special Program (March 13, 2026). These codes have a very short validity period.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">DBJ9RJLMLSZB</span>
                <CopyCode text="DBJ9RJLMLSZB" />
                <p className="text-xs text-muted-foreground">100 Stellar Jade + 50,000 Credits</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">7T3R83MMMTY3</span>
                <CopyCode text="7T3R83MMMTY3" />
                <p className="text-xs text-muted-foreground">100 Stellar Jade + 4 Refined Aether</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">CSJ882LL4BHF</span>
                <CopyCode text="CSJ882LL4BHF" />
                <p className="text-xs text-muted-foreground">100 Stellar Jade + 5 Traveler’s Guide</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border bg-background/50 p-4">
              <p className="text-sm font-medium">⚠️ Pro Tip: Livestream codes typically expire within 24 hours!</p>
            </div>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Requirements to Redeem</h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground">
                  You must complete the Trailblaze Mission <strong>“A Moment of Peace”</strong> before you can redeem codes. This unlocks the in-game mailbox.
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Complete Tutorial
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Unlock Mailbox
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Redeem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">How to Claim Your Rewards</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border p-6">
                <h3 className="mb-4 font-bold text-primary">Method 1: Official Website</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>Visit the official HSR redemption page.</li>
                  <li>Log into your HoYoverse account.</li>
                  <li>Select your server and character.</li>
                  <li>Enter the code and click Redeem.</li>
                </ol>
                <Link 
                  prefetch={false}
                  href="https://hsr.hoyoverse.com/gift" 
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                >
                  Official Site <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
              <div className="rounded-2xl border p-6">
                <h3 className="mb-4 font-bold text-primary">Method 2: In-Game</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>Open the main phone menu.</li>
                  <li>Select the <strong>three-dot icon</strong> near your profile.</li>
                  <li>Click <strong>Redemption Code</strong>.</li>
                  <li>Enter code and confirm.</li>
                </ol>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
