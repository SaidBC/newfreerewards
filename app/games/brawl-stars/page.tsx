import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import Image from "next/image";
import { Metadata } from "next";
import ExpiredRewardsSection from "@/ui/games/ExpiredRewardsSection";
import { defaultLocale, locales, localizePath } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Brawl Stars Free Rewards & Bonus Items`,
  description: `Discover active free rewards, pins, sprays, and promotions available for Brawl Stars.`,
  keywords: [
    "brawl stars free rewards 2026",
    "brawl stars free pin link",
    "brawl stars free spray code",
    "brawl stars voucher codes",
    "brawl stars supercell store rewards",
  ],
  alternates: {
    canonical: "/games/brawl-stars",
    languages: Object.fromEntries(
      locales.map((locale) => [locale, localizePath(locale, "/games/brawl-stars")])
    ),
  },
  openGraph: {
    title: `Brawl Stars – Free Rewards`,
    description: `Claim free rewards and bonuses available on Brawl Stars.`,
    url: `/games/brawl-stars`,
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
            src={"/images/brawl-stars/logo.jpeg"}
            width={125}
            height={125}
            alt={"Brawl Stars"}
          />
          <h1 className="mb-4 text-4xl md:text-5xl font-concert-one">
            Free Brawl Stars Rewards
          </h1>
        </div>

        <p className="max-w-3xl text-muted-foreground text-lg">
          Discover all currently available free Brawl Stars rewards in one
          place. We track free pins, sprays, items, and limited-time bonuses
          so you never miss a reward.
        </p>
      </section>

      <CurrentActiveRewardsSection locale={defaultLocale} game="brawl-stars" />
      <ExpiredRewardsSection locale={defaultLocale} game="brawl-stars" />

      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-2xl font-semibold">Brawl Stars Codes & Search Terms</h2>
          <p className="mt-2 text-muted-foreground">
            Players often search for terms related to Brawl Stars rewards and
            creator support options. This page tracks verified active rewards,
            events, and official links from trusted sources.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>brawl stars free rewards 2026</li>
            <li>brawl stars free pin link</li>
            <li>brawl stars free spray code</li>
            <li>brawl stars voucher codes</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
