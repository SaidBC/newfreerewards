import { Separator } from "@/components/ui/separator";
import HeroSection from "@/ui/HeroSection";
import { RecentRewardsSection } from "@/ui/RecentRewardsSection";
import FaqSection from "@/ui/FaqSection";
import PlatformsListSection from "@/ui/PlatformsListSection";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <main className="px-8 ">
      <HeroSection locale={locale} />
      <RecentRewardsSection locale={locale} />
      <Separator />
      <PlatformsListSection locale={locale} />
      <FaqSection locale={locale} />
    </main>
  );
}
