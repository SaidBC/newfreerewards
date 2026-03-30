import CopyCode from "@/components/CopyCode";
import { getRewardBySlug } from "@/lib/rewardService";
import { prisma } from "@/lib/prisma";
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

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const path = `/games/genshin-impact/rewards/redemption-codes`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.genshinImpactTitle,
    description: t.seo.genshinImpactDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.genshinImpactTitle,
      description: t.seo.genshinImpactDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: ["https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/genshin-impact/logo.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.genshinImpactTitle,
      description: t.seo.genshinImpactDescription,
      images: ["https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/genshin-impact/logo.png"],
    },
  };
}

export default async function GenshinImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  const reward = await getRewardBySlug("genshin-impact", "redemption-codes", locale);

  return (
    <main className="min-h-screen bg-background pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Navigation */}
        {/* Navigation */}
        <Button variant={"link"} asChild className="mb-4 -ml-4">
          <Link
            prefetch={false}
            href={localizePath(locale, "/games/genshin-impact")}
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
              src="https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/genshin-impact/logo.png"
              fill
              className="object-cover"
              alt="Genshin Impact"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-concert-one text-4xl md:text-5xl uppercase tracking-tight">
              {t.games.genshinImpactTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.games.genshinImpactDescription}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <article className="space-y-12 leading-relaxed">
          {/* Working Codes */}
          <section className="rounded-3xl border bg-card/50 p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Active Genshin Impact Codes (March 2026)</h2>
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
              <h2 className="text-2xl font-bold">Genshin Impact 6.4 Livestream Codes</h2>
            </div>
            <p className="mb-6 text-muted-foreground">
              These codes were released during the version 6.4 special program and are available for a very limited time.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Homeward</span>
                <CopyCode text="Homeward" />
                <p className="text-xs text-muted-foreground">x100 Primogems and x10 Mystic Enhancement Ore</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">VarkaArrives</span>
                <CopyCode text="VarkaArrives" />
                <p className="text-xs text-muted-foreground">x100 Primogems and x5 Hero's Wit</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">VisitWonderland</span>
                <CopyCode text="VisitWonderland" />
                <p className="text-xs text-muted-foreground">x100 Primogems and 50,000 Mora</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border bg-background/50 p-4">
              <p className="text-sm font-medium">⚠️ Pro Tip: These codes typically expire within 12–24 hours!</p>
            </div>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Requirements to Redeem</h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground">
                  You must reach <strong>Adventure Rank 10</strong> before you can redeem codes. You can increase your rank by:
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Completing quests
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Opening chests
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Exploring the map
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Story missions
                  </li>
                </ul>
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
                  <li>Visit the official HoYoverse redemption page.</li>
                  <li>Log into your game account.</li>
                  <li>Select your server and character.</li>
                  <li>Enter the code and submit.</li>
                </ol>
                <Link 
                  prefetch={false}
                  href="https://genshin.hoyoverse.com/en/gift" 
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                >
                  Official Site <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
              <div className="rounded-2xl border p-6">
                <h3 className="mb-4 font-bold text-primary">Method 2: In-Game</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>Open the <strong>Paimon menu</strong>.</li>
                  <li>Go to <strong>Settings</strong> → <strong>Account</strong>.</li>
                  <li>Select <strong>Redeem Code</strong>.</li>
                  <li>Enter code and confirm.</li>
                </ol>
              </div>
            </div>
            <div className="mt-8 rounded-2xl bg-muted/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Rewards are delivered to your <strong>in-game mailbox</strong>. Each code can generally be redeemed <strong>only once per account</strong>.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
