import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import Image from "next/image";

import { Metadata } from "next";
import ExpiredRewardsSection from "@/ui/games/ExpiredRewardsSection";
import { defaultLocale, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Clash Royale Free Rewards & Bonuses`,
  description: `Discover active free rewards, bonuses, and promotions available for Clash Royale.`,
};
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
          Discover all currently available free Clash Royale rewards in one place.
          We track free chests, emotes, events, and limited-time bonuses so you
          never miss a reward.
        </p>
      </section>
      <CurrentActiveRewardsSection locale={locale} />
      <ExpiredRewardsSection locale={locale} />
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <p className="mt-4 text-sm font-bold text-muted-foreground">
          Last time updated: 2026 Feb 06
        </p>
      </div>
    </main>
  );
}
