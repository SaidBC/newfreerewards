import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import clientEnv from "@/utils/clientEnv";
import { locales, localizePath } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = clientEnv.NEXT_PUBLIC_URL;
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/games`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    ...locales.flatMap((locale) => [
      { url: `${base}${localizePath(locale, "/")}`, lastModified: now },
      { url: `${base}${localizePath(locale, "/games")}`, lastModified: now },
      {
        url: `${base}${localizePath(locale, "/games/clash-royale")}`,
        lastModified: now,
      },
      { url: `${base}${localizePath(locale, "/contact")}`, lastModified: now },
    ]),
  ];

  // Platforms (games, services, etc.)
  const platforms = await prisma.platform.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const platformPages: MetadataRoute.Sitemap = platforms.map((platform) => ({
    url: `${base}/games/${platform.slug}`,
    lastModified: platform.updatedAt ?? now,
  }));

  const localizedPlatformPages: MetadataRoute.Sitemap = platforms.flatMap(
    (platform) =>
      locales.map((locale) => ({
        url: `${base}${localizePath(locale, `/games/${platform.slug}`)}`,
        lastModified: platform.updatedAt ?? now,
      }))
  );

  // Rewards pages
  const rewards = await prisma.reward.findMany({
    select: {
      slug: true,
      updatedAt: true,
      platform: {
        select: {
          slug: true,
        },
      },
    },
  });

  const rewardPages: MetadataRoute.Sitemap = rewards.map((reward) => ({
    url: `${base}/games/${reward.platform.slug}/rewards/${reward.slug}`,
    lastModified: reward.updatedAt ?? now,
  }));

  const localizedRewardPages: MetadataRoute.Sitemap = rewards.flatMap((reward) =>
    locales.map((locale) => ({
      url: `${base}${localizePath(
        locale,
        `/games/${reward.platform.slug}/rewards/${reward.slug}`
      )}`,
      lastModified: reward.updatedAt ?? now,
    }))
  );

  return [
    ...staticPages,
    ...platformPages,
    ...localizedPlatformPages,
    ...rewardPages,
    ...localizedRewardPages,
  ];
}
