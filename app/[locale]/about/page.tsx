import type { Metadata } from "next";
import {
  getDictionary,
  isLocale,
  defaultLocale,
  type Locale,
  localizePath,
  locales,
} from "@/lib/i18n";

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
    title: `${t.common.aboutUs} | NewFreeRewards`,
    description:
      "Learn about NewFreeRewards mission, team, and editorial standards for free game rewards.",
    alternates: {
      canonical: localizePath(locale, "/about"),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          localizePath(supportedLocale, "/about"),
        ]),
      ),
    },
    openGraph: {
      title: `${t.common.aboutUs} | NewFreeRewards`,
      description:
        "Learn about NewFreeRewards mission, team, and editorial standards for free game rewards.",
      url: localizePath(locale, "/about"),
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-var(--footer-height)-var(--header-height))]">
      <h1 className="text-3xl font-bold mb-8 font-concert-one text-amber-400">
        {t.common.aboutUs}
      </h1>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.common.aboutMission}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            What We Do
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t.common.aboutWhatWeDo}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t.common.aboutTrackRewards}</li>
            <li>{t.common.aboutVerifySources}</li>
            <li>{t.common.aboutStepByStepGuides}</li>
            <li>{t.common.aboutNoHacks}</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Editorial Standards
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t.common.aboutEditorialStandards}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t.common.aboutAccuracy}</li>
            <li>{t.common.aboutTransparency}</li>
            <li>{t.common.aboutIndependence}</li>
            <li>{t.common.aboutUserFirst}</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Team</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t.common.aboutTeam}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                {t.common.aboutFounder}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t.common.aboutFounderDesc}
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                {t.common.aboutContributors}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t.common.aboutContributorsDesc}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t.common.aboutContact}
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p>
              Email:{" "}
              <a
                href={`mailto:${t.common.contactEmailValue}`}
                className="text-primary hover:underline"
              >
                {t.common.contactEmailValue}
              </a>
            </p>
            <p>
              Twitter/X:{" "}
              <a
                href="https://x.com/newfreeerewards"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @newfreeerewards
              </a>
            </p>
            <p>
              TikTok:{" "}
              <a
                href="https://www.tiktok.com/@newfreerewards"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @newfreerewards
              </a>
            </p>
          </div>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Legal & Compliance
          </h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <a
                href={localizePath(locale, "/privacy")}
                className="text-primary hover:underline"
              >
                {t.common.privacyPolicy}
              </a>
            </p>
            <p>
              <a
                href={localizePath(locale, "/terms")}
                className="text-primary hover:underline"
              >
                {t.common.termsOfService}
              </a>
            </p>
            <p>
              <a
                href={localizePath(locale, "/dmca")}
                className="text-primary hover:underline"
              >
                {t.common.dmcaPolicy}
              </a>
            </p>
            <p>
              <a
                href={localizePath(locale, "/disclaimer")}
                className="text-primary hover:underline"
              >
                {t.common.disclaimer}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
