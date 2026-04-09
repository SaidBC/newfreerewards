import { storageUrl } from "@/lib/storage";
import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import ExpiredRewardsSection from "@/ui/games/ExpiredRewardsSection";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPlatformLastUpdated } from "@/lib/rewardService";
import { formatDate } from "@/lib/utils";

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
  const path = `/games/rise-of-kingdoms`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.riseOfKingdomsTitle,
    description: t.seo.riseOfKingdomsDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.riseOfKingdomsTitle,
      description: t.seo.riseOfKingdomsDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: [storageUrl("images/rise-of-kingdoms/logo.png")],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.riseOfKingdomsTitle,
      description: t.seo.riseOfKingdomsDescription,
      images: [storageUrl("images/rise-of-kingdoms/logo.png")],
    },
  };
}

export default async function RiseOfKingdomsGamePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);
  const lastUpdated = await getPlatformLastUpdated("rise-of-kingdoms");
  const formattedDate = lastUpdated ? formatDate(lastUpdated) : "";

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center gap-4">
          <Image
            className="size-12 rounded-md object-cover"
            src={storageUrl("images/rise-of-kingdoms/logo.png")}
            width={125}
            height={125}
            alt="Rise of Kingdoms"
          />
          <h1 className="mb-4 font-concert-one text-4xl sm:text-6xl uppercase leading-none">
            {t.games.riseOfKingdomsTitle}
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {t.games.riseOfKingdomsDescription}
        </p>
      </div>

      <CurrentActiveRewardsSection locale={locale} game="rise-of-kingdoms" />
      <ExpiredRewardsSection locale={locale} game="rise-of-kingdoms" />

      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-2xl font-semibold">Rise of Kingdoms Resources</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium text-primary">Redemption Platform</h3>
              <p className="text-sm text-muted-foreground">
                We track all active promotional codes. You can find the full list and redemption instructions here:
              </p>
              <Link 
                prefetch={false}
                href={localizePath(locale, "/games/rise-of-kingdoms/rewards/redemption-codes")}
                className="inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Rise of Kingdoms Codes &amp; How to Redeem
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Recent Topics:</h3>
              <ul className="list-disc ml-5 text-muted-foreground text-sm space-y-1">
                <li>Rise of Kingdoms codes for gems 2026</li>
                <li>How to use codes in Rise of Kingdoms</li>
                <li>April 2026 active working codes</li>
                <li>Best ways to get free keys in Rise of Kingdoms</li>
              </ul>
            </div>
          </div>
        </section>
        {formattedDate && (
          <p className="mt-4 text-sm font-bold text-muted-foreground">
            {t.games.lastUpdatedLabel}: {formattedDate}
          </p>
        )}
      </div>
    </main>
  );
}
