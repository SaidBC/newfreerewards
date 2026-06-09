"use client";

import { useEffect, useMemo, useState } from "react";
import RewardItem from "./RewardItem";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowDown, MinusIcon, PlusIcon } from "lucide-react";
import type { TranslatedRewards } from "@/lib/rewardService";

const INITIAL_LIMIT = 10;

import { type GameSlug } from "@/types/games";

const SHUFFLE_CACHE_KEY_PREFIX = "nfr_shuffle_";

function getCachedShuffledIds(game: string, locale: string): string[] | null {
  try {
    const raw = sessionStorage.getItem(
      SHUFFLE_CACHE_KEY_PREFIX + game + "_" + locale,
    );
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return null;
  }
}

function setCachedShuffledIds(game: string, locale: string, ids: string[]) {
  try {
    sessionStorage.setItem(
      SHUFFLE_CACHE_KEY_PREFIX + game + "_" + locale,
      JSON.stringify(ids),
    );
  } catch {
    // Non-critical – shuffle will just recompute.
  }
}

/**
 * Deterministically order rewards based on a one-time-per-session shuffle
 * stored in sessionStorage. This ensures:
 *  - The shuffle only happens once per session (per game + locale).
 *  - When the user navigates away and comes back, the order stays the same.
 *  - The shuffle is consistent across re-renders.
 */
function useSessionStableShuffle(
  rewards: TranslatedRewards,
  game: string,
  locale: string,
) {
  return useMemo(() => {
    if (!rewards || rewards.length === 0) return [];

    const cachedIds = getCachedShuffledIds(game, locale);

    if (cachedIds && cachedIds.length === rewards.length) {
      // Re-order the rewards according to the cached shuffled IDs.
      const idToReward = new Map(rewards.map((r) => [r.id, r]));
      const ordered: TranslatedRewards = [];
      for (const id of cachedIds) {
        const reward = idToReward.get(id);
        if (reward) ordered.push(reward);
      }
      // If all IDs matched, return the cached order.
      if (ordered.length === rewards.length) return ordered;
    }

    // First visit this session – shuffle and cache.
    const shuffled = [...rewards].sort(() => Math.random() - 0.5);
    setCachedShuffledIds(
      game,
      locale,
      shuffled.map((r) => r.id),
    );
    return shuffled;
  }, [rewards, game, locale]);
}

export default function CurrentActiveRewardsClient({
  locale,
  game,
  initialRewards,
}: {
  locale: Locale;
  game: GameSlug;
  initialRewards: TranslatedRewards;
}) {
  const t = getDictionary(locale);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowMore(false);
  }, [game, locale]);

  const allRewards = useSessionStableShuffle(initialRewards, game, locale);

  const rewards = showMore ? allRewards : allRewards.slice(0, INITIAL_LIMIT);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <h2 className="mb-6 text-2xl font-concert-one">
        {t.games.activeRewards}
      </h2>
      <div className="rounded-2xl border border-dashed p-4 sm:p-10 flex flex-col items-center gap-8">
        {allRewards.length === 0 ? (
          <div className="flex min-h-40 w-full items-center justify-center text-sm text-muted-foreground">
            {t.games.noActiveRewards}
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 w-full">
            {rewards.map((reward) => (
              <RewardItem
                key={reward.id}
                src={reward.previewImage || ""}
                platform={reward.platform}
                title={reward.name}
                slug={reward.slug}
                game={game}
                locale={locale}
              />
            ))}
          </ul>
        )}

        {allRewards.length > INITIAL_LIMIT && (
          <div className="flex flex-col items-center gap-2">
            {!showMore && (
              <div className="flex flex-col items-center animate-bounce mb-4">
                <span className="text-sm font-concert-one text-primary mb-1">
                  {t.common.seeMoreRewards}
                </span>
                <ArrowDown className="text-primary size-10" />
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              className="font-concert-one"
              data-trigger-popunder="true"
              aria-expanded={showMore}
              onClick={() => setShowMore((value) => !value)}
            >
              {showMore ? <MinusIcon /> : <PlusIcon />}
              {showMore ? t.common.seeLess : t.common.seeMore}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
