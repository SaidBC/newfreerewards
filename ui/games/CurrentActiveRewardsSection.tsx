import siteConfig from "@/lib/siteConfig";
import RewardItem from "./RewardItem";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function CurrentActiveRewardsSection({ locale }: { locale: Locale }) {
  const rewards = siteConfig.clashroyale.rewards.filter(
    (reward) => reward.status === "active"
  );
  const t = getDictionary(locale);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <h2 className="mb-6 text-2xl font-concert-one">{t.games.activeRewards}</h2>
      <div className="rounded-2xl border border-dashed p-10 ">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
      </div>
    </section>
  );
}
