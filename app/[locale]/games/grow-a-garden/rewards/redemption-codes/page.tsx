import CopyCode from "@/components/CopyCode";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const path = `/games/grow-a-garden/rewards/redemption-codes`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.growAGardenTitle,
    description: t.seo.growAGardenDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.growAGardenTitle,
      description: t.seo.growAGardenDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: ["https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/grow-a-garden/logo.webp"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.growAGardenTitle,
      description: t.seo.growAGardenDescription,
      images: ["https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/grow-a-garden/logo.webp"],
    },
  };
}

export default async function GrowAGardenRedemptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen bg-background pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Navigation */}
        <Button variant={"link"} asChild className="mb-4 -ml-4">
          <Link
            prefetch={false}
            href={localizePath(locale, "/games/grow-a-garden")}
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
              src="https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/grow-a-garden/logo.webp"
              fill
              className="object-cover"
              alt="Grow a Garden"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-concert-one text-4xl md:text-5xl uppercase tracking-tight">
              {t.games.growAGardenTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.games.growAGardenDescription}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <article className="space-y-12 leading-relaxed">
          {/* Working Codes */}
          <section className="rounded-3xl border bg-card/50 p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Active Grow a Garden Codes (March 2026)</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">RDCAward</span>
                <CopyCode text="RDCAward" />
                <p className="text-xs text-muted-foreground">1x RDC Award cosmetic</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">BEANORLEAVE10</span>
                <CopyCode text="BEANORLEAVE10" />
                <p className="text-xs text-muted-foreground">1x Green Bean Chamber cosmetic</p>
              </div>
            </div>
          </section>

          {/* How to Redeem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">How to Claim Your Rewards</h2>
            <div className="grid gap-6 md:grid-cols-1">
              <div className="rounded-2xl border p-6">
                <h3 className="mb-4 font-bold text-primary">In-Game Redemption Steps</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>Launch <strong>Grow a Garden</strong> in the Roblox launcher.</li>
                  <li>Click on the <strong>Settings icon</strong> at the top left corner of the screen.</li>
                  <li>Type in the active code in the <strong>‘Type code here…’</strong> section.</li>
                  <li>Click on <strong>Claim</strong> to get your free rewards.</li>
                </ol>
              </div>
            </div>
            <div className="mt-8 rounded-2xl bg-muted/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Grow a Garden is a chill game, so redeeming codes is also incredibly simple. Enjoy your new cosmetics!
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
