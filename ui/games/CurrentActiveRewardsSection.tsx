"use client";

import { useEffect, useState } from "react";
import RewardItem from "./RewardItem";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MinusIcon, PlusIcon } from "lucide-react";

const INITIAL_LIMIT = 12;

type GameSlug =
  | "clash-royale"
  | "clash-of-clans"
  | "brawl-stars"
  | "genshin-impact"
  | "honkai-star-rail"
  | "roblox"
  | "rise-of-kingdoms"
  | "grow-a-garden";

type RewardSummary = {
  id: number;
  slug: string;
  name: string;
  previewImage: string | null;
  createdAt: string;
  platform: {
    name: string;
  };
};

type RewardsApiResponse =
  | { success: true; data: RewardSummary[] }
  | { success: false; message: string };

export default function CurrentActiveRewardsSection({
  locale,
  game,
}: {
  locale: Locale;
  game: GameSlug;
}) {
  const t = getDictionary(locale);
  const [allRewards, setAllRewards] = useState<RewardSummary[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setShowMore(false);
  }, [game, locale]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRewards() {
      setIsLoading(true);
      setHasError(false);

      try {
        const searchParams = new URLSearchParams({
          platform: game,
          locale,
        });
        const response = await fetch(`/api/rewards?${searchParams.toString()}`, {
          signal: controller.signal,
        });
        const payload = (await response.json()) as RewardsApiResponse;

        if (!response.ok || !payload.success) {
          throw new Error("Failed to load rewards");
        }

        const sortedRewards = [...payload.data].sort((left, right) => {
          return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
        });

        setAllRewards(sortedRewards.reverse());
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setAllRewards([]);
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadRewards();

    return () => controller.abort();
  }, [game, locale]);

  const rewards = showMore ? allRewards : allRewards.slice(0, INITIAL_LIMIT);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <h2 className="mb-6 text-2xl font-concert-one">{t.games.activeRewards}</h2>
      <div className="rounded-2xl border border-dashed p-4 sm:p-10 flex flex-col items-center gap-8">
        {isLoading ? (
          <div className="flex min-h-40 w-full items-center justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Spinner />
              <span>{t.common.loading}</span>
            </div>
          </div>
        ) : hasError ? (
          <div className="flex min-h-40 w-full items-center justify-center text-sm text-destructive">
            {t.common.failedToLoad}
          </div>
        ) : allRewards.length === 0 ? (
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
        )}
      </div>
    </section>
  );
}
