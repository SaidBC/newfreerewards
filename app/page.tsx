import { Separator } from "@/components/ui/separator";
import HeroSection from "@/ui/HeroSection";
import { RecentRewardsSection } from "@/ui/RecentRewardsSection";
import FaqSection from "@/ui/FaqSection";
import PlatformsListSection from "@/ui/PlatformsListSection";
import { defaultLocale } from "@/lib/i18n";

export default function Page() {
  return (
    <main className="px-8 ">
      <HeroSection locale={defaultLocale} />
      <RecentRewardsSection locale={defaultLocale} />
      <Separator />
      <PlatformsListSection locale={defaultLocale} />
      <FaqSection locale={defaultLocale} />
    </main>
  );
}
