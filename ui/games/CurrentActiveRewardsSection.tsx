"use client";

import { useState } from "react";
import { getLocalizedClashRoyaleRewards } from "@/lib/siteConfig";
import RewardItem from "./RewardItem";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function CurrentActiveRewardsSection({ locale }: { locale: Locale }) {
  const [showAll, setShowAll] = useState(false);
  
  const allRewards = getLocalizedClashRoyaleRewards(locale).filter(
    (reward) => reward.status === "active"
  );
  
  const t = getDictionary(locale);
  
  const INITIAL_LIMIT = 10;
  const rewards = showAll ? allRewards : allRewards.slice(0, INITIAL_LIMIT);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <h2 className="mb-6 text-2xl font-concert-one">{t.games.activeRewards}</h2>
      <div className="rounded-2xl border border-dashed p-4 sm:p-10 flex flex-col items-center gap-8">
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 w-full">
          {rewards.map((reward) => (
            <RewardItem
              key={reward.id}
              src={reward.previewImage}
              platform={reward.platform}
              title={reward.name}
              slug={reward.slug}
              locale={locale}
            />
          ))}
        </ul>
        
        {!showAll && allRewards.length > INITIAL_LIMIT && (
          <Button 
            onClick={() => setShowAll(true)}
            variant="outline"
            className="font-concert-one"
            data-trigger-popunder="true"
          >
            {t.common.seeMore}
          </Button>
        )}
      </div>
    </section>
  );
}
