import RewardDetailViewClient, { type RewardDetailViewClientProps } from "./RewardDetailViewClient";
import { getRewardEngagement } from "@/lib/rewardEngagementService";
import { unstable_cache } from "next/cache";

const getCachedEngagement = unstable_cache(
  async (rewardId: number) => getRewardEngagement(rewardId, "anonymous"),
  ["reward-engagement"],
  { revalidate: 3600 }
);

export default async function RewardDetailView(props: Omit<RewardDetailViewClientProps, "initialEngagement">) {
  const initialEngagement = (!props.isPreview && props.reward?.id) ? await getCachedEngagement(props.reward.id) : null;
  return <RewardDetailViewClient {...props} initialEngagement={initialEngagement} />;
}
