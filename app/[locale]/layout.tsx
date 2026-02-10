import type { Metadata } from "next";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { Analytics } from "@vercel/analytics/next";
import clientEnv from "@/utils/clientEnv";
import MonetageVignette from "@/components/MonetageVignette";
import MonetageInPagePush from "@/components/MonetageInPagePush";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "NewFreeRewards – Free Rewards, Bonuses & Promotions",
  description:
    "Discover free rewards, bonuses, promo codes, and giveaways from games and online platforms. No hacks. Updated daily.",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      {clientEnv.NEXT_PUBLIC_NODE_ENV === "production" && <Analytics />}
      <MonetageVignette />
      <MonetageInPagePush />
    </div>
  );
}
