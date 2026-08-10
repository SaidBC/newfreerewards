"use client";

import { useEffect, useState } from "react";
import RewardItem from "./RewardItem";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowDown, MinusIcon, PlusIcon } from "lucide-react";
import type { TranslatedRewards } from "@/lib/rewardService";

const INITIAL_LIMIT = 10;

import { type GameSlug } from "@/types/games";

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

  // Use rewards as-is from server (already sorted by createdAt desc)
  const allRewards = initialRewards || [];

  const rewards = showMore ? allRewards : allRewards.slice(0, INITIAL_LIMIT);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-concert-one">{t.games.activeRewards}</h2>
        <span className="text-sm text-muted-foreground">
          {allRewards.length} {allRewards.length === 1 ? "reward" : "rewards"}
        </span>
      </div>
      <div className="rounded-2xl border bg-card p-4 sm:p-10 flex flex-col items-center gap-8">
        {allRewards.length === 0 ? (
          <div className="flex min-h-40 w-full items-center justify-center text-sm text-muted-foreground">
            {t.games.noActiveRewards}
          </div>
        ) : (
          <ul className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 w-full">
            {rewards.map((reward) => (
              <RewardItem
                key={reward.id}
                src={reward.previewImage || ""}
                platform={reward.platform}
                title={reward.name}
                slug={reward.slug}
                game={game}
                locale={locale}
                claimUrl={reward.claimUrl}
              />
            ))}
          </ul>
        )}

        {allRewards.length > INITIAL_LIMIT && (
          <div className="flex flex-col items-center gap-2 pt-4">
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
