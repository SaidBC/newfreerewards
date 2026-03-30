import CopyCode from "@/components/CopyCode";
import { getRewardBySlug } from "@/lib/rewardService";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { ArrowLeft, Gift } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);
  const reward = await getRewardBySlug("rise-of-kingdoms", "redemption-codes", locale);

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const path = `/games/rise-of-kingdoms/rewards/redemption-codes`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.riseOfKingdomsTitle,
    description: t.seo.riseOfKingdomsDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.riseOfKingdomsTitle,
      description: t.seo.riseOfKingdomsDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: ["https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/rise-of-kingdoms/logo.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.riseOfKingdomsTitle,
      description: t.seo.riseOfKingdomsDescription,
      images: ["https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/rise-of-kingdoms/logo.png"],
    },
  };
}

export default async function RiseOfKingdomsRedemptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);
  const reward = await getRewardBySlug("rise-of-kingdoms", "redemption-codes", locale);

  return (
    <main className="min-h-screen bg-background pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Navigation */}
        <Button variant={"link"} asChild className="mb-4 -ml-4">
          <Link
            prefetch={false}
            href={localizePath(locale, "/games/rise-of-kingdoms")}
            data-trigger-popunder="true"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t.games.back}</span>
          </Link>
        </Button>

        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl">
            <Image
              src="https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/rise-of-kingdoms/logo.png"
              fill
              className="object-cover"
              alt="Rise of Kingdoms"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-concert-one text-4xl md:text-5xl uppercase tracking-tight">
              {t.games.riseOfKingdomsTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.games.riseOfKingdomsDescription}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <article className="space-y-12 leading-relaxed">
          {/* Working Codes */}
          <section className="rounded-3xl border bg-card/50 p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Active Rise of Kingdoms Codes (March 2026)</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reward?.content?.filter((b: any) => b.type === "code").map((block: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{block.value}</span>
                  <CopyCode text={block.value || ""} />
                  {block.label && <p className="text-xs text-muted-foreground">{block.label}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* How to Redeem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">How to Claim Your Rewards</h2>
            <div className="grid gap-6 md:grid-cols-1">
              <div className="rounded-2xl border p-6">
                <h3 className="mb-4 font-bold text-primary">In-Game Redemption Steps</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>Tap on your <strong>profile icon</strong> in the top left corner of the screen.</li>
                  <li>Head on to the <strong>Settings</strong> menu.</li>
                  <li>Select the <strong>Redeem</strong> option (which appears as a gift icon).</li>
                  <li>Type in the active code and tap on the <strong>Exchange</strong> button.</li>
                </ol>
              </div>
            </div>
            <div className="mt-8 rounded-2xl bg-muted/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                All rewards will be sent directly to your in-game mailbox. Make sure to redeem the codes before their expiration date, which can sometimes be quite tight!
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
