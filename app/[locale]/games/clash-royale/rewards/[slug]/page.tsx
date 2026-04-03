import { storageUrl } from "@/lib/storage";
import RewardEngagementBar from "@/components/rewards/RewardEngagementBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CopyCode from "@/components/CopyCode";
import { getRewardBySlug } from "@/lib/rewardService";
import { prisma } from "@/lib/prisma";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  locales,
  type Locale,
} from "@/lib/i18n";

export const dynamic = "force-static";
export const revalidate = 3600;
export const dynamicParams = true;

type RewardContentBlock = {
  type: "text" | "image" | "code" | "link";
  value?: string | null;
  href?: string | null;
  label?: string | null;
  imageSrc?: string | null;
  imageAlt?: string | null;
};

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

async function getRewardFromDB(platform: string, slug: string, locale: Locale) {
  return await getRewardBySlug(platform, slug, locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  const t = getDictionary(locale);
  const reward = await getRewardFromDB("clash-royale", slug, locale);
  const platformName = "Clash Royale";
  const rewardName = reward?.title || "Unknown Reward";

  const rewardPath = `/games/clash-royale/rewards/${slug}`;

  return {
    title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
    description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
    alternates: {
      canonical: localizePath(locale, rewardPath),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          localizePath(supportedLocale, rewardPath),
        ])
      ),
    },
    openGraph: {
      title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
      description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
      url: localizePath(locale, rewardPath),
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const rewards = await prisma.reward.findMany({
    where: { platform: { slug: "clash-royale" } },
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

import RewardDetailView from "@/components/rewards/RewardDetailView";

export default async function Page({ params }: PageProps) {
  const { locale: requestedLocale, slug } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  const reward = await getRewardFromDB("clash-royale", slug, locale);
  if (!reward) return notFound();

  return <RewardDetailView reward={reward} locale={locale} t={t} />;
}
