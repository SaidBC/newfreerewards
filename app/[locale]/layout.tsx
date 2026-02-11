import type { Metadata } from "next";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { Analytics } from "@vercel/analytics/next";
import clientEnv from "@/utils/clientEnv";
import MonetageVignette from "@/components/MonetageVignette";
import MonetageInPagePush from "@/components/MonetageInPagePush";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: t.seo.siteTitle,
    description: t.seo.siteDescription,
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      {clientEnv.NEXT_PUBLIC_NODE_ENV === "production" && <Analytics />}
      {clientEnv.NEXT_PUBLIC_NODE_ENV === "production" && <MonetageVignette />}
      {clientEnv.NEXT_PUBLIC_NODE_ENV === "production" && (
        <MonetageInPagePush />
      )}
    </div>
  );
}
