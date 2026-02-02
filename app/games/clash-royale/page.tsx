import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import Image from "next/image";

import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import clientEnv from "@/utils/clientEnv";
import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import ExpiredRewardsSection from "@/ui/games/ExpiredRewardsSection";

export const metadata: Metadata = {
  title: `Clash Royale Free Rewards & Bonuses`,
  description: `Discover active free rewards, bonuses, and promotions available for Clash Royale.`,
  openGraph: {
    title: `Clash Royale – Free Rewards`,
    description: `Claim free rewards and bonuses available on Clash Royale.`,
    url: `/games/clash-royale`,
    type: "website",
  },
};
export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero / Intro */}
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
            Free Clash Royale Rewards
          </h1>
        </div>

        <p className="max-w-3xl text-muted-foreground text-lg">
          Discover all currently available free Clash Royale rewards in one
          place. We track free chests, emotes, events, and limited-time bonuses
          so you never miss a reward.
        </p>
      </section>
      <AdBanner
        className=" md:w-182 md:h-22.5 @[468px]:w-117 @[468px]:h-15 w-[320px] h-12.5 mx-auto my-4"
        adConfigs={[
          {
            width: 728,
            height: 90,
            apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_728X90_API_KEY,
          },
          {
            width: 468,
            height: 60,
            apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_API_KEY,
          },
          {
            width: 320,
            height: 50,
            apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_API_KEY,
          },
        ]}
      />
      <CurrentActiveRewardsSection />
      <ExpiredRewardsSection />
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <p className="mt-4 text-sm font-bold text-muted-foreground">
          Last time updated: 2026 Feb 02
        </p>
      </div>
      <AdsterraNativeBanner />
    </main>
  );
}
