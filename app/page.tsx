import { Separator } from "@/components/ui/separator";
import HeroSection from "@/ui/HeroSection";
import { RecentRewardsSection } from "@/ui/RecentRewardsSection";
import RewardsListSection from "@/ui/RewardsListSection";
import AdPlaceholder from "@/ui/AdPlaceholder";
import FaqSection from "@/ui/FaqSection";

export default function Page() {
  return (
    <main className="px-8 ">
      <HeroSection />
      <AdPlaceholder />
      <RecentRewardsSection />
      <AdPlaceholder />
      <Separator />
      <RewardsListSection />
      <FaqSection />
    </main>
  );
}
