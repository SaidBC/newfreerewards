import ExpiredRewardsClient from "./ExpiredRewardsClient";
import { getRewardsByPlatform } from "@/lib/rewardService";
import type { Locale } from "@/lib/i18n";
import { unstable_cache } from "next/cache";

type GameSlug =
  | "clash-royale"
  | "clash-of-clans"
  | "brawl-stars"
  | "genshin-impact"
  | "honkai-star-rail"
  | "roblox"
  | "rise-of-kingdoms"
  | "grow-a-garden";

const getCachedRewards = unstable_cache(
  async (game: string, locale: string, status: "active" | "expired") => {
    return getRewardsByPlatform(game, locale as Locale, status);
  },
  ["rewards-cache"],
  {
    revalidate: 3600,
  }
);

export default async function ExpiredRewardsSection({
  locale,
  game,
}: {
  locale: Locale;
  game: GameSlug;
}) {
  const initialRewards = await getCachedRewards(game, locale, "expired");
  return (
    <ExpiredRewardsClient
      locale={locale}
      game={game}
      initialRewards={initialRewards}
    />
  );
}
