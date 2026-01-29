-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_platformId_fkey";

-- DropForeignKey
ALTER TABLE "RewardContent" DROP CONSTRAINT "RewardContent_rewardId_fkey";

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardContent" ADD CONSTRAINT "RewardContent_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;
