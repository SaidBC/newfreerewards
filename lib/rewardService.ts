import { prisma } from "./prisma";
import { Locale } from "./i18n";
import { Reward, RewardContent, Platform, RewardStatus } from "@prisma/client";
import { normalizeStorageUrl } from "./storage";

export type TranslatedReward = Reward & {
  platform: Platform;
  content: any[];
  name: string;
  template: string;
};

export type TranslatedRewards = TranslatedReward[];

export async function getRewardsByPlatform(
  platformSlug: string,
  locale: Locale,
  status: RewardStatus = "active",
): Promise<TranslatedRewards> {
  const platform = await prisma.platform.findUnique({
    where: { slug: platformSlug },
  });

  if (!platform) return [];

  const rewards = await prisma.reward.findMany({
    where: { platformId: platform.id, status },
    include: { contents: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return rewards.map((reward) => translateReward(reward, locale, platform));
}

export async function getRewardBySlug(
  platformSlug: string,
  slug: string,
  locale: Locale,
): Promise<TranslatedReward | null> {
  const platform = await prisma.platform.findUnique({
    where: { slug: platformSlug },
  });

  if (!platform) return null;

  const reward = await prisma.reward.findFirst({
    where: { slug, platformId: platform.id },
    include: {
      platform: true,
      contents: { orderBy: { order: "asc" } },
    },
  });

  if (!reward) return null;

  return translateReward(reward, locale, reward.platform);
}

function translateReward(
  reward: any,
  locale: Locale,
  platform: Platform,
): TranslatedReward {
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
    previewImage:
      normalizeStorageUrl(reward.previewImage) ?? reward.previewImage,
    template: reward.template,
    content: reward.contents.map((content: any) => {
      const contentTranslations = (content.translations as any) || {};
      const contentLocaleData = contentTranslations[locale] || {};
      const meta = contentTranslations._meta || {};

      return {
        type: content.type,
        value: contentLocaleData.value || content.value,
        href: content.href,
        label: contentLocaleData.label || content.label,
        src: normalizeStorageUrl(content.imageSrc) ?? content.imageSrc,
        imageSrc: normalizeStorageUrl(content.imageSrc) ?? content.imageSrc,
        alt: contentLocaleData.alt || content.imageAlt,
        imageAlt: contentLocaleData.alt || content.imageAlt,
        listType: meta.listType || "ordered",
        listItems: meta.listItems || [],
        titleLevel: meta.titleLevel || "h2",
      };
    }),
  };
}

export async function getPlatformLastUpdated(
  platformSlug: string,
): Promise<Date | null> {
  const platform = await prisma.platform.findUnique({
    where: { slug: platformSlug },
    select: { updatedAt: true },
  });

  if (!platform) return null;

  const latestReward = await prisma.reward.findFirst({
    where: {
      platformId: (await prisma.platform.findUnique({
        where: { slug: platformSlug },
        select: { id: true },
      }))!.id,
    },
    select: { updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const platformUpdated = platform.updatedAt;
  const latestRewardUpdated = latestReward?.updatedAt;

  if (!latestRewardUpdated) return platformUpdated;

  return platformUpdated > latestRewardUpdated
    ? platformUpdated
    : latestRewardUpdated;
}
