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
    title: `${t.common.dmcaPolicy} | NewFreeRewards`,
    description:
      "Digital Millennium Copyright Act (DMCA) policy for NewFreeRewards. Copyright infringement notice and takedown procedures.",
    alternates: {
      canonical: localizePath(locale, "/dmca"),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          localizePath(supportedLocale, "/dmca"),
        ]),
      ),
    },
    openGraph: {
      title: `${t.common.dmcaPolicy} | NewFreeRewards`,
      description:
        "Digital Millennium Copyright Act (DMCA) policy for NewFreeRewards. Copyright infringement notice and takedown procedures.",
      url: localizePath(locale, "/dmca"),
      type: "website",
    },
  };
}

export default async function DMCAPage({
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
      <h1 className="text-3xl font-bold mb-8">{t.common.dmcaPolicy}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            1. DMCA Notice
          </h2>
          <p>
            NewFreeRewards respects the intellectual property rights of others
            and expects its users to do the same. In accordance with the Digital
            Millennium Copyright Act (DMCA), we will respond promptly to notices
            of alleged copyright infringement that comply with the requirements
            set forth below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            2. Designated Copyright Agent
          </h2>
          <p>
            To file a DMCA notice with us, please contact our designated
            copyright agent:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p>
              <strong>Name:</strong> NewFreeRewards DMCA Agent
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:razzouksaid139@gmail.com"
                className="text-primary hover:underline"
              >
                razzouksaid139@gmail.com
              </a>
            </p>
            <p>
              <strong>Subject Line:</strong> DMCA Notice - NewFreeRewards
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            3. DMCA Takedown Notice Requirements
          </h2>
          <p>
            To be effective, a DMCA takedown notice must be a written
            communication that includes substantially the following:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>
              A physical or electronic signature of the copyright owner or a
              person authorized to act on their behalf;
            </li>
            <li>
              Identification of the copyrighted work claimed to have been
              infringed, or, if multiple copyrighted works at a single online
              site are covered by a single notification, a representative list
              of such works;
            </li>
            <li>
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably
              sufficient to permit us to locate the material;
            </li>
            <li>
              Information reasonably sufficient to permit us to contact the
              complaining party, such as an address, telephone number, and, if
              available, an email address;
            </li>
            <li>
              A statement that the complaining party has a good faith belief
              that use of the material in the manner complained of is not
              authorized by the copyright owner, its agent, or the law;
            </li>
            <li>
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that the complaining party is
              authorized to act on behalf of the owner of an exclusive right
              that is allegedly infringed.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            4. Counter-Notification
          </h2>
          <p>
            If you believe that material was removed or disabled by mistake or
            misidentification, you may file a counter-notification. A
            counter-notification must be a written communication that includes:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Your physical or electronic signature;</li>
            <li>
              Identification of the material that has been removed or to which
              access has been disabled and the location at which the material
              appeared before it was removed or access to it was disabled;
            </li>
            <li>
              A statement under penalty of perjury that you have a good faith
              belief that the material was removed or disabled as a result of
              mistake or misidentification;
            </li>
            <li>
              Your name, address, and telephone number, and a statement that you
              consent to the jurisdiction of the Federal District Court for the
              judicial district in which your address is located (or if you are
              outside the United States, for any judicial district in which we
              may be found), and that you will accept service of process from
              the person who provided the original DMCA notification.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            5. Repeat Infringers
          </h2>
          <p>
            In appropriate circumstances, NewFreeRewards may terminate the
            accounts of users who are repeat infringers of copyrights or other
            intellectual property rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            6. False Claims
          </h2>
          <p>
            Please be aware that under Section 512(f) of the DMCA, any person
            who knowingly materially misrepresents that material or activity is
            infringing may be subject to liability for damages. If you are
            unsure whether material available online infringes your copyright,
            we suggest you contact an attorney before filing a DMCA
            notification.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            7. Content Policy Clarification
          </h2>
          <p>
            NewFreeRewards provides information about free rewards, promotional
            codes, and bonuses from games and online platforms. We do not host,
            distribute, or facilitate the distribution of copyrighted game
            files, hacks, cheats, or unauthorized software. All reward codes and
            promotional information shared on this site are sourced from
            official game channels, developer announcements, and publicly
            available sources.
          </p>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            8. Contact Information
          </h2>
          <p>
            For any questions regarding this DMCA policy, please contact us:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:razzouksaid139@gmail.com"
                className="text-primary hover:underline"
              >
                razzouksaid139@gmail.com
              </a>
            </p>
            <p>
              <strong>Subject:</strong> DMCA Policy Inquiry
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
