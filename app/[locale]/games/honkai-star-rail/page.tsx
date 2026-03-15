import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import ExpiredRewardsSection from "@/ui/games/ExpiredRewardsSection";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
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

  const baseUrl = "https://newfreerewards.com";
  const path = `/games/honkai-star-rail`;

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
      images: ["/images/honkai-star-rail/logo.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.honkaiStarRailTitle,
      description: t.seo.honkaiStarRailDescription,
      images: ["/images/honkai-star-rail/logo.png"],
    },
  };
}

export default async function HonkaiStarRailGamePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link
          href={localizePath(locale, "/games")}
          className="mb-8 flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.games.back}
        </Link>

        <div className="flex items-center gap-4">
          <Image
            className="size-12 rounded-md object-cover"
            src="/images/honkai-star-rail/logo.png"
            width={125}
            height={125}
            alt="Honkai: Star Rail"
          />
          <h1 className="mb-4 font-concert-one text-4xl sm:text-6xl uppercase leading-none">
            {t.games.honkaiStarRailTitle}
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {t.games.honkaiStarRailDescription}
        </p>
      </div>

      <CurrentActiveRewardsSection locale={locale} game="honkai-star-rail" />
      <ExpiredRewardsSection locale={locale} game="honkai-star-rail" />

      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-2xl font-semibold">Honkai: Star Rail Resources</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium text-primary">Redemption Platform</h3>
              <p className="text-sm text-muted-foreground">
                We track all active promotional codes for Honkai: Star Rail. You can find the full list and redemption instructions here:
              </p>
              <Link 
                href={localizePath(locale, "/games/honkai-star-rail/rewards/redemption-codes")}
                className="inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Honkai: Star Rail Codes &amp; How to Redeem
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Recent Topics:</h3>
              <ul className="list-disc ml-5 text-muted-foreground text-sm space-y-1">
                <li>Honkai: Star Rail stellar jade codes 2026</li>
                <li>Version 4.1 livestream redemption codes</li>
                <li>March 2026 active working codes</li>
                <li>How to unlock the redemption feature</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
