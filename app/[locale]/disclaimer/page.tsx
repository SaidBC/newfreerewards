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
    title: `${t.common.disclaimer} | NewFreeRewards`,
    description:
      "Disclaimer and affiliate disclosure for NewFreeRewards. Important legal notices regarding content accuracy, affiliate relationships, and user responsibilities.",
    alternates: {
      canonical: localizePath(locale, "/disclaimer"),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          localizePath(supportedLocale, "/disclaimer"),
        ]),
      ),
    },
    openGraph: {
      title: `${t.common.disclaimer} | NewFreeRewards`,
      description:
        "Disclaimer and affiliate disclosure for NewFreeRewards. Important legal notices regarding content accuracy, affiliate relationships, and user responsibilities.",
      url: localizePath(locale, "/disclaimer"),
      type: "website",
    },
  };
}

export default async function DisclaimerPage({
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
      <h1 className="text-3xl font-bold mb-8">{t.common.disclaimer}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            1. General Information Disclaimer
          </h2>
          <p>
            The information provided on NewFreeRewards ("we," "us," "our") is
            for general informational purposes only. While we strive to keep the
            information up to date and accurate, we make no representations or
            warranties of any kind, express or implied, about the completeness,
            accuracy, reliability, suitability, or availability with respect to
            the website or the information, products, services, or related
            graphics contained on the website for any purpose.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            2. No Guarantee of Reward Availability
          </h2>
          <p>
            NewFreeRewards aggregates information about free rewards,
            promotional codes, and bonuses from various games and platforms.
            However, we <strong>cannot guarantee</strong> that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Any specific reward, code, or promotion will be available at the
              time you attempt to claim it
            </li>
            <li>Rewards will work in your specific region or country</li>
            <li>Rewards have not expired or reached their redemption limit</li>
            <li>Game developers or platforms will honor the promotion</li>
          </ul>
          <p>
            All rewards are subject to the terms and conditions set by the
            respective game developers and platforms. Availability may vary by
            region, platform, account status, and time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            3. Affiliate Disclosure (FTC Compliance)
          </h2>
          <p>
            NewFreeRewards may contain affiliate links. When you click on
            certain links and make a purchase or complete an action, we may earn
            a commission at no additional cost to you. This helps support the
            operation of this website.
          </p>
          <p>Specifically:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              We participate in affiliate programs with various gaming platforms
              and services
            </li>
            <li>
              Affiliate relationships do not influence our editorial content or
              reward listings
            </li>
            <li>
              We only promote services we believe provide value to our users
            </li>
            <li>All affiliate links are clearly disclosed where possible</li>
          </ul>
          <p>
            This disclosure is in accordance with the Federal Trade Commission
            (FTC) guidelines on endorsements and testimonials in advertising.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            4. No Affiliation with Game Developers
          </h2>
          <p>
            NewFreeRewards is{" "}
            <strong>not affiliated with, endorsed by, or sponsored by</strong>{" "}
            any game developer, publisher, or platform mentioned on this
            website, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4 text-sm">
            <li>Supercell (Clash Royale, Clash of Clans, Brawl Stars)</li>
            <li>HoYoverse (Genshin Impact, Honkai: Star Rail)</li>
            <li>Roblox Corporation</li>
            <li>Lilith Games (Rise of Kingdoms)</li>
            <li>Blue Lock Rivals developers</li>
            <li>Any other game studios or platforms referenced</li>
          </ul>
          <p>
            All game titles, logos, images, and trademarks are the property of
            their respective owners. Their use on this site is for informational
            and educational purposes only under fair use principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            5. Third-Party Links
          </h2>
          <p>
            Our website contains links to third-party websites that are not
            owned or controlled by NewFreeRewards. We have no control over, and
            assume no responsibility for, the content, privacy policies, or
            practices of any third-party websites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party websites you visit. The inclusion of any
            link does not imply endorsement by NewFreeRewards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            6. User Responsibility
          </h2>
          <p>By using NewFreeRewards, you acknowledge and agree that:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>You use the information at your own risk</li>
            <li>
              You are responsible for verifying reward validity before
              attempting to claim
            </li>
            <li>
              You will not use any information for unauthorized or illegal
              purposes
            </li>
            <li>
              You will comply with the terms of service of the respective games
              and platforms
            </li>
            <li>
              You will not hold NewFreeRewards liable for any losses, damages,
              or disappointments resulting from reward claims
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            7. No Professional Advice
          </h2>
          <p>
            The content on NewFreeRewards is not intended to constitute
            professional, legal, financial, or technical advice. For specific
            advice regarding your situation, please consult with qualified
            professionals.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            8. Changes to This Disclaimer
          </h2>
          <p>
            We reserve the right to modify this disclaimer at any time. Changes
            will be effective immediately upon posting. Your continued use of
            the website after any changes constitutes acceptance of the revised
            disclaimer.
          </p>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            9. Contact Us
          </h2>
          <p>
            If you have any questions about this disclaimer, please contact us:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p>
              Email:{" "}
              <a
                href={`mailto:${t.common.contactEmailValue}`}
                className="text-primary hover:underline"
              >
                {t.common.contactEmailValue}
              </a>
            </p>
            <p>Subject: Disclaimer Inquiry</p>
          </div>
        </section>
      </div>
    </main>
  );
}
