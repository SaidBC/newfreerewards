import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import Image from "next/image";

import { Metadata } from "next";
import ExpiredRewardsSection from "@/ui/games/ExpiredRewardsSection";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  locales,
  type Locale,
} from "@/lib/i18n";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: t.seo.clashRoyaleTitle,
    description: t.seo.clashRoyaleDescription,
    keywords: [
      "codes for clash royale",
      "clash royale code",
      "supercell code clash royale",
      "supercell clash royale code",
      "codes in clash royale",
      "clash royale gems code",
      "clash royale codes for gems",
    ],
    alternates: {
      canonical: localizePath(locale, "/games/clash-royale"),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          localizePath(supportedLocale, "/games/clash-royale"),
        ])
      ),
    },
    openGraph: {
      title: t.seo.clashRoyaleTitle,
      description: t.seo.clashRoyaleDescription,
      url: localizePath(locale, "/games/clash-royale"),
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={"/clash-royale.jpg"}
            width={125}
            height={125}
            alt={"Clash Royale"}
          />
          <h1 className="mb-4 text-4xl md:text-5xl font-concert-one">
            {t.games.clashRoyaleTitle}
          </h1>
        </div>

        <p className="max-w-3xl text-muted-foreground text-lg">
          {t.games.clashRoyaleDescription}
        </p>
      </section>
      <CurrentActiveRewardsSection locale={locale} />
      <ExpiredRewardsSection locale={locale} />
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-2xl font-semibold">Clash Royale Codes & Search Terms</h2>
          <p className="mt-2 text-muted-foreground">
            Players often search for terms related to Clash Royale rewards and
            creator support options. This page tracks verified active rewards,
            events, and official links from trusted sources.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>codes for clash royale</li>
            <li>clash royale code</li>
            <li>supercell code clash royale</li>
            <li>supercell clash royale code</li>
            <li>codes in clash royale</li>
            <li>clash royale gems code</li>
            <li>clash royale codes for gems</li>
          </ul>
        </section>
        <p className="mt-4 text-sm font-bold text-muted-foreground">
          {t.games.lastUpdatedLabel}: 2026 Feb 24
        </p>
      </div>
    </main>
  );
}
