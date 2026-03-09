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
  const path = `/games/brawl-stars`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.brawlStarsTitle,
    description: t.seo.brawlStarsDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.brawlStarsTitle,
      description: t.seo.brawlStarsDescription,
      url: `${baseUrl}/${locale}${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.brawlStarsTitle,
      description: t.seo.brawlStarsDescription,
    },
  };
}

export default async function BrawlStarsPage({
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

        <h1 className="mb-4 font-concert-one text-4xl sm:text-6xl uppercase">
          {t.games.brawlStarsTitle}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {t.games.brawlStarsDescription}
        </p>
      </div>

      <CurrentActiveRewardsSection locale={locale} game="brawl-stars" />
      <ExpiredRewardsSection locale={locale} game="brawl-stars" />

      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-2xl font-semibold">Brawl Stars Codes & Search Terms</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Popular Search Terms:</h3>
              <ul className="list-disc ml-5 text-muted-foreground text-sm">
                <li>brawl stars free rewards 2026</li>
                <li>brawl stars free pin link</li>
                <li>brawl stars free spray code</li>
                <li>brawl stars voucher codes</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Active Resources:</h3>
              <ul className="list-disc ml-5 text-muted-foreground text-sm">
                <li>Supercell Store (Daily)</li>
                <li>Official Vouchers</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
