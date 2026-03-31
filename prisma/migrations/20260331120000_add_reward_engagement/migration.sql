-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('love', 'dislike');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('expired', 'not_working');

-- CreateTable
CREATE TABLE "RewardReaction" (
    "id" SERIAL NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "visitorId" TEXT NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardReport" (
    "id" SERIAL NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "visitorId" TEXT NOT NULL,
    "reportDay" TIMESTAMP(3) NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RewardReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardReaction_rewardId_visitorId_key" ON "RewardReaction"("rewardId", "visitorId");

-- CreateIndex
CREATE INDEX "RewardReaction_rewardId_reactionType_idx" ON "RewardReaction"("rewardId", "reactionType");

-- CreateIndex
CREATE UNIQUE INDEX "RewardReport_rewardId_visitorId_reportDay_key" ON "RewardReport"("rewardId", "visitorId", "reportDay");

-- CreateIndex
CREATE INDEX "RewardReport_rewardId_reportType_idx" ON "RewardReport"("rewardId", "reportType");

-- CreateIndex
CREATE INDEX "RewardReport_rewardId_createdAt_idx" ON "RewardReport"("rewardId", "createdAt");

-- AddForeignKey
ALTER TABLE "RewardReaction" ADD CONSTRAINT "RewardReaction_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardReport" ADD CONSTRAINT "RewardReport_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;
