import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import Image from "next/image";
import { Metadata } from "next";
import ExpiredRewardsSection from "@/ui/games/ExpiredRewardsSection";
import { defaultLocale, locales, localizePath } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Clash of Clans Free Rewards & Bonuses`,
  description: `Discover active free rewards, bonuses, and promotions available for Clash of Clans.`,
  keywords: [
    "clash of clans free gold 2026",
    "coc free rewards link",
    "clash of clans voucher codes",
    "coc monthly rewards supercell store",
  ],
  alternates: {
    canonical: "/games/clash-of-clans",
    languages: Object.fromEntries(
      locales.map((locale) => [locale, localizePath(locale, "/games/clash-of-clans")])
    ),
  },
  openGraph: {
    title: `Clash of Clans – Free Rewards`,
    description: `Claim free rewards and bonuses available on Clash of Clans.`,
    url: `/games/clash-of-clans`,
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={"/images/clash-of-clans/Clash_of_Clans.webp"}
            width={125}
            height={125}
            alt={"Clash of Clans"}
          />
          <h1 className="mb-4 text-4xl md:text-5xl font-concert-one">
            Free Clash of Clans Rewards
          </h1>
        </div>

        <p className="max-w-3xl text-muted-foreground text-lg">
          Discover all currently available free Clash of Clans rewards in one
          place. We track free gold, items, events, and limited-time bonuses
          so you never miss a reward.
        </p>
      </section>

      <CurrentActiveRewardsSection locale={defaultLocale} game="clash-of-clans" />
      <ExpiredRewardsSection locale={defaultLocale} game="clash-of-clans" />

      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-2xl font-semibold">Clash of Clans Codes & Search Terms</h2>
          <p className="mt-2 text-muted-foreground">
            Players often search for terms related to Clash of Clans rewards and
            creator support options. This page tracks verified active rewards,
            events, and official links from trusted sources.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>clash of clans free gold 2026</li>
            <li>coc free rewards link</li>
            <li>clash of clans voucher codes</li>
            <li>coc monthly rewards supercell store</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
