import { Separator } from "@/components/ui/separator";
import HeroSection from "@/ui/HeroSection";
import { RecentRewardsSection } from "@/ui/RecentRewardsSection";
import FaqSection from "@/ui/FaqSection";
import PlatformsListSection from "@/ui/PlatformsListSection";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: t.seo.siteTitle,
    description: t.seo.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: t.seo.siteTitle,
      description: t.seo.siteDescription,
      url: `/${locale}`,
      type: "website",
    },
  };
}

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
