import { MetadataRoute } from "next";
import clientEnv from "@/utils/clientEnv";
import { locales } from "@/lib/i18n";
import { getLocalizedClashRoyaleRewards } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = clientEnv.NEXT_PUBLIC_URL;
  const now = new Date();
  const rewards = getLocalizedClashRoyaleRewards("en");

  const localePages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    { url: `${base}/${locale}`, lastModified: now },
    { url: `${base}/${locale}/games`, lastModified: now },
    { url: `${base}/${locale}/contact`, lastModified: now },
    { url: `${base}/${locale}/games/clash-royale`, lastModified: now },
  ]);

  const localizedRewardPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    rewards.map((reward) => ({
      url: `${base}/${locale}/games/clash-royale/rewards/${reward.slug}`,
      lastModified: now,
    }))
  );

  return [...localePages, ...localizedRewardPages];
}
