import { storageUrl } from "@/lib/storage";
import RewardEngagementBar from "@/components/rewards/RewardEngagementBar";
import { getRewardBySlug } from "@/lib/rewardService";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import CopyCode from "@/components/CopyCode";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour
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

  // For static params, we can still fetch from DB
  const rewards = await prisma.reward.findMany({
    where: { platform: { slug: "brawl-stars" } },
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
  const reward = await getRewardFromDB("brawl-stars", slug, locale);

  if (!reward) {
    return {
      title: "Reward Not Found",
    };
  }

  const platformName = "Brawl Stars";
  const rewardName = reward.name;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const rewardPath = `/games/brawl-stars/rewards/${slug}`;

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

import RewardDetailView from "@/components/rewards/RewardDetailView";
import AdsComponent from "@/components/AdsComponent";

export default async function RewardPage({ params }: PageProps) {
  const { slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  const t = getDictionary(locale);
  const reward = await getRewardFromDB("brawl-stars", slug, locale);

  if (!reward) {
    notFound();
  }

  return (
    <div className="bg-background">
      <RewardDetailView reward={reward} locale={locale} t={t} />
    </div>
  );
}
