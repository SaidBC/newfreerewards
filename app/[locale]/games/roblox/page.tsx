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
  const path = `/games/roblox`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.robloxTitle,
    description: t.seo.robloxDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.robloxTitle,
      description: t.seo.robloxDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: [storageUrl("images/roblox/logo.png")],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.robloxTitle,
      description: t.seo.robloxDescription,
      images: [storageUrl("images/roblox/logo.png")],
    },
  };
}

export default async function RobloxGamePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);
  const lastUpdated = await getPlatformLastUpdated("roblox");
  const formattedDate = lastUpdated ? formatDate(lastUpdated) : "";

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center gap-4">
          <Image
            className="size-12 rounded-md object-cover"
            src={storageUrl("images/roblox/logo.png")}
            width={125}
            height={125}
            alt="Roblox"
          />
          <h1 className="mb-4 font-concert-one text-4xl sm:text-6xl uppercase leading-none">
            {t.games.robloxTitle}
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {t.games.robloxDescription}
        </p>
      </div>

      <CurrentActiveRewardsSection locale={locale} game="roblox" />
      <ExpiredRewardsSection locale={locale} game="roblox" />

      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-2xl font-semibold">Roblox Resources</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium text-primary">Redemption Platform</h3>
              <p className="text-sm text-muted-foreground">
                We track all active promotional codes. You can find the full list and redemption instructions here:
              </p>
              <Link 
                prefetch={false}
                href={localizePath(locale, "/games/roblox/rewards/redemption-codes")}
                className="inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Roblox Codes &amp; How to Redeem
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Recent Topics:</h3>
              <ul className="list-disc ml-5 text-muted-foreground text-sm space-y-1">
                <li>Roblox promo codes for free items 2026</li>
                <li>How to use codes on Roblox official site</li>
                <li>April 2026 active working codes</li>
                <li>Recent Roblox bundles and accessories</li>
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
