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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-var(--footer-height)-var(--header-height))]">
      <h1 className="text-3xl font-bold mb-8 font-concert-one text-amber-400">
        {t.nav.contact}
      </h1>
      
      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <p className="text-lg mb-8 text-muted-foreground">
          {t.common.contactDescription}
        </p>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">@</span> {t.common.contactEmail}
            </h2>
            <a 
              href="mailto:razzouksaid139@gmail.com" 
              className="text-xl text-primary hover:underline transition-all w-fit"
            >
              razzouksaid139@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t">
            <h2 className="text-xl font-semibold">
              {t.common.followUs}
            </h2>
            <div className="flex gap-6">
              <a 
                href="https://x.com/newfreeerewards" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-medium"
              >
                Twitter / X
              </a>
              <a 
                href="https://www.tiktok.com/@newfreerewards" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-medium"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
