import { Button } from "@/components/ui/button";
import CopyCode from "@/components/CopyCode";
import { getRewardBySlug } from "@/lib/rewardService";
import { prisma } from "@/lib/prisma";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getRewardFromDB(platform: string, slug: string, locale: Locale) {
  return await getRewardBySlug(platform, slug, locale);
}

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "es", "ar"];
  const params: { locale: string; slug: string }[] = [];

  const rewards = await prisma.reward.findMany({
    where: { platform: { slug: "clash-of-clans" } },
    select: { slug: true },
  });

  for (const locale of locales) {
    for (const reward of rewards) {
      params.push({
        locale,
        slug: reward.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  const t = getDictionary(locale);
  const reward = await getRewardFromDB("clash-of-clans", slug, locale);

  if (!reward) {
    return {
      title: "Reward Not Found",
    };
  }

  const platformName = "Clash of Clans";
  const rewardName = reward.name;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const rewardPath = `/games/clash-of-clans/rewards/${slug}`;

  const languages = {
    en: `${baseUrl}/en${rewardPath}`,
    es: `${baseUrl}/es${rewardPath}`,
    ar: `${baseUrl}/ar${rewardPath}`,
    "x-default": `${baseUrl}/en${rewardPath}`,
  };

  return {
    title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
    description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
    alternates: {
      canonical: `${baseUrl}/${locale}${rewardPath}`,
      languages,
    },
    openGraph: {
      title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
      description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
      url: `${baseUrl}/${locale}${rewardPath}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
      description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
    },
  };
}

export default async function RewardPage({ params }: PageProps) {
  const { slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  const t = getDictionary(locale);
  const reward = await getRewardFromDB("clash-of-clans", slug, locale);

  if (!reward) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Button variant={"link"} asChild>
          <Link prefetch={false} href={localizePath(locale, "/games/clash-of-clans")} data-trigger-popunder="true">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t.games.back}</span>
          </Link>
        </Button>
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={reward.platform.image || "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/Clash_of_Clans.webp"}
            width={48}
            height={48}
            alt={reward.platform.name}
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-concert-one uppercase">
              Free {reward.platform.name} Rewards
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              {reward.name}
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-muted-foreground text-lg italic">
          {reward.description}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 flex flex-col gap-8">
        <div className="space-y-8 rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="font-concert-one text-xl uppercase italic">{t.games.stepByStepGuide}</h2>
          </div>

          <div className="space-y-6">
            {reward.content.map((block, index) => (
              <div key={index} className="flex flex-col gap-4">
                {renderBlock(block, index, locale)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function renderBlock(block: any, index: number, locale: Locale) {
  switch (block.type) {
    case "text":
      return (
        <p key={index} className="text-muted-foreground leading-relaxed">
          {block.value}
        </p>
      );
    case "image":
      const isQrCode = block.alt?.toLowerCase().includes("qr") || block.src?.toLowerCase().includes("qr");
      return (
        <div key={index} className={`relative mt-2 overflow-hidden rounded-lg border ${isQrCode ? "max-w-[200px]" : ""}`}>
          <Image
            src={block.src || "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/Clash_of_Clans.webp"}
            alt={block.alt || "reward step"}
            width={isQrCode ? 200 : 800}
            height={isQrCode ? 200 : 450}
            className="h-auto w-full object-contain"
          />
        </div>
      );
    case "link":
      return (
        <Button key={index} asChild className="mt-2 w-full sm:w-fit font-concert-one">
          <a href={block.href} target="_blank" rel="noopener noreferrer">
            {block.label || "Claim Reward"}
          </a>
        </Button>
      );
    case "code":
      return (
        <div key={index} className="mt-2">
          <CopyCode text={block.value || ""} />
        </div>
      );
    default:
      return null;
  }
}
