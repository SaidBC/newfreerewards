import { prisma } from "./prisma";
import { Locale, defaultLocale } from "./i18n";
import { Reward, RewardContent, Platform } from "@prisma/client";

export type TranslatedReward = Reward & {
  platform: Platform;
  content: any[];
  name: string; // for compatibility
};

export type TranslatedRewards = TranslatedReward[];

export async function getRewardsByPlatform(platformSlug: string, locale: Locale): Promise<TranslatedRewards> {
  const platform = await prisma.platform.findUnique({
    where: { slug: platformSlug },
    include: {
      rewards: {
        where: { status: "active" },
        include: { contents: { orderBy: { order: "asc" } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!platform) return [];

  return platform.rewards.map((reward) => translateReward(reward, locale, platform));
}

export async function getRewardBySlug(platformSlug: string, slug: string, locale: Locale): Promise<TranslatedReward | null> {
  const reward = await prisma.reward.findUnique({
    where: { slug },
    include: {
      platform: true,
      contents: { orderBy: { order: "asc" } },
    },
  });

  if (!reward || reward.platform.slug !== platformSlug) return null;

  return translateReward(reward, locale, reward.platform);
}

function translateReward(reward: any, locale: Locale, platform: Platform): TranslatedReward {
  const translations = (reward.translations as any) || {};
  const localeData = translations[locale] || {};

  return {
    ...reward,
    platform,
    name: localeData.title || reward.title,
    title: localeData.title || reward.title,
    description: localeData.description || reward.description,
    content: reward.contents.map((content: any) => {
      const contentTranslations = (content.translations as any) || {};
      const contentLocaleData = contentTranslations[locale] || {};
      
      return {
        type: content.type,
        value: contentLocaleData.value || content.value,
        href: content.href,
        label: contentLocaleData.label || content.label,
        src: content.imageSrc,
        alt: contentLocaleData.alt || content.imageAlt,
      };
    }),
  };
}
