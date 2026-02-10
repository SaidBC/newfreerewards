import type { Metadata } from "next";
import { Concert_One, Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { Analytics } from "@vercel/analytics/next";
import clientEnv from "@/utils/clientEnv";
import MonetageVignette from "@/components/MonetageVignette";
import MonetageInPagePush from "@/components/MonetageInPagePush";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const concertOne = Concert_One({
  variable: "--font-concert-one",
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewFreeRewards – Free Rewards, Bonuses & Promotions",
  description:
    "Discover free rewards, bonuses, promo codes, and giveaways from games and online platforms. No hacks. Updated daily.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${concertOne.variable} ${geistMono.variable} antialiased`}
      >
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        {clientEnv.NEXT_PUBLIC_NODE_ENV === "production" && <Analytics />}
        <MonetageVignette />
        <MonetageInPagePush />
      </body>
    </html>
  );
}
