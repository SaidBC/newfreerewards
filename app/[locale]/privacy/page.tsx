import type { Metadata } from "next";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: t.common.privacyPolicy,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t.common.privacyPolicy}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">1. Information We Collect</h2>
          <p>We do not require user accounts to browse our rewards. However, we may collect minimal data such as:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Usage data (via Vercel Analytics).</li>
            <li>Browser type and device information.</li>
            <li>General geographic location based on IP address.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">2. How We Use Information</h2>
          <p>The information collected is used solely to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Improve website performance and user experience.</li>
            <li>Monitor and analyze trends and usage.</li>
            <li>Ensure the security of our website.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">3. Third-Party Services</h2>
          <p>We may use third-party services like Vercel Analytics to understand how visitors interact with our site. These services may use cookies and similar technologies.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our contact page.</p>
        </section>
      </div>
    </main>
  );
}
