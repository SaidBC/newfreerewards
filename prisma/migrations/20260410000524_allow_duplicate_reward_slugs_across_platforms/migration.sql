/*
  Warnings:

  - A unique constraint covering the columns `[platformId,slug]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reward_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reward_platformId_slug_key" ON "Reward"("platformId", "slug");
