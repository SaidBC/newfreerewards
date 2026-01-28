import siteConfig from "@/lib/siteConfig";
import RewardItem from "./RewardItem";

export default function CurrentActiveRewardsSection() {
  const rewards = siteConfig.clashroyale.rewards;
  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <h2 className="mb-6 text-2xl font-concert-one">Current Active Rewards</h2>
      <div className="rounded-2xl border border-dashed p-10 ">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {rewards.map((reward) => (
            <RewardItem
              key={reward.slug}
              src={reward.previewImage}
              platform={reward.platform}
              title={reward.name}
              slug={reward.id}
            />
          ))}
        </ul>
      </div>
      {/* Empty State */}
      {/* <div className="rounded-2xl border border-dashed p-10 text-center">
      <p className="text-muted-foreground">
        No active rewards available right now.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Check back later — we update this page frequently.
      </p>
    </div> */}

      <p className="mt-4 text-sm font-bold text-muted-foreground">
        Last time updated: 2026 Jan 25
      </p>
    </section>
  );
}
