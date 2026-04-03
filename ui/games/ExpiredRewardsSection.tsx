"use client";

import { useEffect, useState } from "react";
import RewardItem from "./RewardItem";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Spinner } from "@/components/ui/spinner";

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
  platform: {
    name: string;
  };
};

type RewardsApiResponse =
  | { success: true; data: RewardSummary[] }
  | { success: false; message: string };

export default function ExpiredRewardsSection({
  locale,
  game,
}: {
  locale: Locale;
  game: GameSlug;
}) {
  const t = getDictionary(locale);
  const [rewards, setRewards] = useState<RewardSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRewards() {
      setIsLoading(true);
      setHasError(false);

      try {
        const searchParams = new URLSearchParams({
          platform: game,
          locale,
          status: "expired",
        });
        const response = await fetch(`/api/rewards?${searchParams.toString()}`, {
          signal: controller.signal,
        });
        const payload = (await response.json()) as RewardsApiResponse;

        if (!response.ok || !payload.success) {
          throw new Error("Failed to load rewards");
        }

        setRewards(payload.data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        setRewards([]);
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

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="mb-6 text-2xl font-concert-one">{t.games.expiredRewards}</h2>
        <div className="rounded-2xl border border-dashed p-10 flex items-center justify-center">
          <Spinner />
        </div>
      </section>
    );
  }

  if (rewards.length === 0 && !hasError) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <h2 className="mb-6 text-2xl font-concert-one">{t.games.expiredRewards}</h2>
      <div className="rounded-2xl border border-dashed p-4 sm:p-10 ">
        {hasError ? (
          <div className="text-center text-destructive py-10">{t.common.failedToLoad}</div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
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
      </div>
    </section>
  );
}
