import ComingSoonPage from "@/components/ComingSoonPage";
import type { Metadata } from "next";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";

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
    title: `${t.nav.contact} | NewFreeRewards`,
    description:
      "Contact NewFreeRewards for feedback, corrections, partnership requests, or reward submissions.",
    alternates: {
      canonical: localizePath(locale, "/contact"),
    },
    openGraph: {
      title: `${t.nav.contact} | NewFreeRewards`,
      description:
        "Reach out to NewFreeRewards for updates, corrections, and business inquiries.",
      url: localizePath(locale, "/contact"),
      type: "website",
    },
  };
}

export default function Page() {
  return <ComingSoonPage />;
}
