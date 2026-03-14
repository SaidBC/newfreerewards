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
    title: t.common.termsOfService,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t.common.termsOfService}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">1. Agreement to Terms</h2>
          <p>By accessing NewFreeRewards, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">2. Use of the Site</h2>
          <p>NewFreeRewards provides information about free rewards and bonuses. We do not provide hacks, cheats, or unauthorized access to game servers. All information is provided "as is".</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">3. Intellectual Property</h2>
          <p>The content on this site, including text, logos, and images, is the property of NewFreeRewards or its content suppliers and is protected by international copyright laws.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">4. Limitation of Liability</h2>
          <p>In no event shall NewFreeRewards be liable for any damages arising out of the use or inability to use the material on our website.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">5. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction.</p>
        </section>
      </div>
    </main>
  );
}
