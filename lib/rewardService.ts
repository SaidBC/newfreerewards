import { prisma } from "./prisma";
import { Locale, defaultLocale } from "./i18n";
import { Reward, RewardContent, Platform, RewardStatus } from "@prisma/client";
import { normalizeStorageUrl } from "./storage";

export type TranslatedReward = Reward & {
  platform: Platform;
  content: any[];
  name: string; // for compatibility
};

export type TranslatedRewards = TranslatedReward[];

export async function getRewardsByPlatform(
  platformSlug: string, 
  locale: Locale, 
  status: RewardStatus = "active"
): Promise<TranslatedRewards> {
  const platform = await prisma.platform.findUnique({
    where: { slug: platformSlug },
    include: {
      rewards: {
        where: { status },
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
    platform: {
      ...platform,
      image: normalizeStorageUrl(platform.image) ?? platform.image,
    },
    name: localeData.title || reward.title,
    title: localeData.title || reward.title,
    description: localeData.description || reward.description,
    image: normalizeStorageUrl(reward.image) ?? reward.image,
    previewImage: normalizeStorageUrl(reward.previewImage) ?? reward.previewImage,
    content: reward.contents.map((content: any) => {
      const contentTranslations = (content.translations as any) || {};
      const contentLocaleData = contentTranslations[locale] || {};
      
      return {
        type: content.type,
        value: contentLocaleData.value || content.value,
        href: content.href,
        label: contentLocaleData.label || content.label,
        src: normalizeStorageUrl(content.imageSrc) ?? content.imageSrc,
        imageSrc: normalizeStorageUrl(content.imageSrc) ?? content.imageSrc,
        alt: contentLocaleData.alt || content.imageAlt,
        imageAlt: contentLocaleData.alt || content.imageAlt,
      };
    }),
  };
}
