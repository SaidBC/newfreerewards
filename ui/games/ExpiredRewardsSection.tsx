import ExpiredRewardsClient from "./ExpiredRewardsClient";
import { getRewardsByPlatform } from "@/lib/rewardService";
import type { Locale } from "@/lib/i18n";

import { type GameSlug } from "@/types/games";

export default async function ExpiredRewardsSection({
  locale,
  game,
}: {
  locale: Locale;
  game: GameSlug;
}) {
  const initialRewards = await getRewardsByPlatform(game, locale, "expired");
  return (
    <ExpiredRewardsClient
      locale={locale}
      game={game}
      initialRewards={initialRewards}
    />
  );
}
