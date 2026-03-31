import { storageUrl } from "@/lib/storage";
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
import { ArrowLeft, Gift, CheckCircle, ExternalLink } from "lucide-react";
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
  const reward = await getRewardBySlug("roblox", "redemption-codes", locale);

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const path = `/games/roblox/rewards/redemption-codes`;

  const languages = {
    en: `${baseUrl}/en${path}`,
    es: `${baseUrl}/es${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/en${path}`,
  };

  return {
    title: t.seo.robloxTitle,
    description: t.seo.robloxDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: t.seo.robloxTitle,
      description: t.seo.robloxDescription,
      url: `${baseUrl}/${locale}${path}`,
      images: [storageUrl("images/roblox/logo.png")],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.robloxTitle,
      description: t.seo.robloxDescription,
      images: [storageUrl("images/roblox/logo.png")],
    },
  };
}

export default async function RobloxRedemptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);
  const reward = await getRewardBySlug("roblox", "redemption-codes", locale);

  return (
    <main className="min-h-screen bg-background pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Navigation */}
        <Button variant={"link"} asChild className="mb-4 -ml-4">
          <Link
            prefetch={false}
            href={localizePath(locale, "/games/roblox")}
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
              src={storageUrl("images/roblox/logo.png")}
              fill
              className="object-cover"
              alt="Roblox"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-concert-one text-4xl md:text-5xl uppercase tracking-tight">
              {t.games.robloxTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.games.robloxDescription}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <article className="space-y-12 leading-relaxed">
          {/* Working Codes */}
          <section className="rounded-3xl border bg-card/50 p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Active Roblox Codes (March 2026)</h2>
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

          {/* Requirements */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Requirements to Redeem</h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground">
                  To redeem Roblox codes, you must have a registered Roblox account. Some codes may be specific to certain games within the platform, but general promo codes can be redeemed on the official website.
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Valid Roblox Account
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Internet Connection
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Redeem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">How to Claim Your Rewards</h2>
            <div className="grid gap-6 md:grid-cols-1">
              <div className="rounded-2xl border p-6">
                <h3 className="mb-4 font-bold text-primary">Official Redemption Method</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>Go to the <Link href="https://www.roblox.com/redeem" target="_blank" className="text-primary hover:underline">Roblox Redemption Page</Link>.</li>
                  <li>Log in to your account.</li>
                  <li>Enter the code in the <strong>&quot;Enter Your Code&quot;</strong> field.</li>
                  <li>Click <strong>Redeem</strong>.</li>
                  <li>Check your <strong>Inventory</strong> to see your new item.</li>
                </ol>
                <Link 
                  prefetch={false}
                  href="https://www.roblox.com/redeem" 
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                >
                  Official Site <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="mt-8 rounded-2xl bg-muted/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Rewards are usually added to your account immediately. Make sure to check the category of the item you redeemed (e.g., Accessories, Bundles) in your inventory.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
