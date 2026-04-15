import CurrentActiveRewardsClient from "./CurrentActiveRewardsClient";
import { getRewardsByPlatform } from "@/lib/rewardService";
import type { Locale } from "@/lib/i18n";
import { unstable_cache } from "next/cache";

import { type GameSlug } from "@/types/games";


const getCachedRewards = unstable_cache(
  async (game: string, locale: string, status: "active" | "expired") => {
    return getRewardsByPlatform(game, locale as Locale, status);
  },
  ["rewards-cache"],
  {
    revalidate: 3600,
  }
);

export default async function CurrentActiveRewardsSection({
  locale,
  game,
}: {
  locale: Locale;
  game: GameSlug;
}) {
  const initialRewards = await getCachedRewards(game, locale, "active");
  return (
    <CurrentActiveRewardsClient
      locale={locale}
      game={game}
      initialRewards={initialRewards}
    />
  );
}
