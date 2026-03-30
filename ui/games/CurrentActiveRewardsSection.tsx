import { getRewardsByPlatform } from "@/lib/rewardService";
import RewardItem from "./RewardItem";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const INITIAL_LIMIT = 12;

export default async function CurrentActiveRewardsSection({
  locale,
  game,
}: {
  locale: Locale;
  game: "clash-royale" | "clash-of-clans" | "brawl-stars" | "genshin-impact" | "honkai-star-rail" | "roblox" | "rise-of-kingdoms" | "grow-a-garden";
}) {
  const allRewards = await getRewardsByPlatform(game, locale);
  
  const t = getDictionary(locale);
  
  const rewards = allRewards.slice(0, INITIAL_LIMIT);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <h2 className="mb-6 text-2xl font-concert-one">{t.games.activeRewards}</h2>
      <div className="rounded-2xl border border-dashed p-4 sm:p-10 flex flex-col items-center gap-8">
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
        
        {allRewards.length > INITIAL_LIMIT && (
          <Button 
            variant="outline"
            className="font-concert-one"
            asChild
            data-trigger-popunder="true"
          >
            <a href={`/${locale}/games/${game}`}>{t.common.seeMore}</a>
          </Button>
        )}
      </div>
    </section>
  );
}
