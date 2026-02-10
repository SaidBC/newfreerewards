import { Separator } from "@/components/ui/separator";
import HeroSection from "@/ui/HeroSection";
import { RecentRewardsSection } from "@/ui/RecentRewardsSection";
import FaqSection from "@/ui/FaqSection";
import PlatformsListSection from "@/ui/PlatformsListSection";

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
