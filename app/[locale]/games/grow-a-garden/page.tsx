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
  const path = `/games/grow-a-garden`;

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
      images: [storageUrl("images/grow-a-garden/logo.webp")],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.growAGardenTitle,
      description: t.seo.growAGardenDescription,
      images: [storageUrl("images/grow-a-garden/logo.webp")],
    },
  };
}

export default async function GrowAGardenGamePage({
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
        <div className="flex items-center gap-4">
          <Image
            className="size-12 rounded-md object-cover"
            src={storageUrl("images/grow-a-garden/logo.webp")}
            width={125}
            height={125}
            alt="Grow a Garden"
          />
          <h1 className="mb-4 font-concert-one text-4xl sm:text-6xl uppercase leading-none">
            {t.games.growAGardenTitle}
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {t.games.growAGardenDescription}
        </p>
      </div>

      <CurrentActiveRewardsSection locale={locale} game="grow-a-garden" />
      <ExpiredRewardsSection locale={locale} game="grow-a-garden" />

      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-2xl font-semibold">Grow a Garden Resources</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium text-primary">Redemption Platform</h3>
              <p className="text-sm text-muted-foreground">
                We track all active promotional codes. You can find the full list and redemption instructions here:
              </p>
              <Link 
                prefetch={false}
                href={localizePath(locale, "/games/grow-a-garden/rewards/redemption-codes")}
                className="inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Grow a Garden Codes &amp; How to Redeem
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Recent Topics:</h3>
              <ul className="list-disc ml-5 text-muted-foreground text-sm space-y-1">
                <li>Grow a Garden free cosmetic codes 2026</li>
                <li>How to use codes in Grow a Garden</li>
                <li>March 2026 active working codes</li>
                <li>New rewards for Grow a Garden players</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
