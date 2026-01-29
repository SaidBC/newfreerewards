import { Separator } from "@/components/ui/separator";
import HeroSection from "@/ui/HeroSection";
import { RecentRewardsSection } from "@/ui/RecentRewardsSection";
import FaqSection from "@/ui/FaqSection";
import PlatformsListSection from "@/ui/PlatformsListSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NewFreeRewards – Free Rewards, Bonuses & Promotions",
  description:
    "Discover free rewards, bonuses, promo codes, and giveaways from games and online platforms. No hacks. Updated daily.",
  openGraph: {
    title: "NewFreeRewards – Free Rewards & Bonuses",
    description:
      "Find free rewards from games and online platforms. Emotes, bonuses, credits, and more.",
    url: "/",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="px-8 ">
      <HeroSection />
      <RecentRewardsSection />
      <Separator />
      <PlatformsListSection />
      <FaqSection />
    </main>
  );
}
