import CurrentActiveRewardsClient from "./CurrentActiveRewardsClient";
import { getRewardsByPlatform } from "@/lib/rewardService";
import type { Locale } from "@/lib/i18n";

import { type GameSlug } from "@/types/games";

export default async function CurrentActiveRewardsSection({
  locale,
  game,
}: {
  locale: Locale;
  game: GameSlug;
}) {
  const initialRewards = await getRewardsByPlatform(game, locale, "active");
  return (
    <CurrentActiveRewardsClient
      locale={locale}
      game={game}
      initialRewards={initialRewards}
    />
  );
}
