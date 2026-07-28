import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RewardDetailView from "@/components/rewards/RewardDetailView";
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

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    locale: string;
    gameSlug: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const rewards = await prisma.reward.findMany({
    select: {
      slug: true,
      platform: { select: { slug: true } },
    },
  });

  const params: { locale: string; gameSlug: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const reward of rewards) {
      params.push({
        locale,
        gameSlug: reward.platform.slug,
        slug: reward.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { gameSlug, slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;
  const t = getDictionary(locale);
  const reward = await getRewardBySlug(gameSlug, slug, locale);

  if (!reward) {
    return { title: "Reward Not Found" };
  }

  const platformName = reward.platform.name;
  const rewardName = reward.name;
  const rewardPath = `/games/${gameSlug}/rewards/${slug}`;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${baseUrl}${localizePath(supportedLocale, rewardPath)}`,
    ]),
  );
  languages["x-default"] =
    `${baseUrl}${localizePath(defaultLocale, rewardPath)}`;

  return {
    title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
    description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
    alternates: {
      canonical: `${baseUrl}${localizePath(locale, rewardPath)}`,
      languages,
    },
    openGraph: {
      title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
      description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
      url: `${baseUrl}${localizePath(locale, rewardPath)}`,
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
  const { gameSlug, slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;
  const t = getDictionary(locale);

  const reward = await getRewardBySlug(gameSlug, slug, locale);

  if (!reward) {
    notFound();
  }

  return (
    <div className="bg-background">
      <RewardDetailView reward={reward} locale={locale} t={t} />
    </div>
  );
}
