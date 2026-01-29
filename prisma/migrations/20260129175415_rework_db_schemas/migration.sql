/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Platform` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Reward` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RewardStatus" AS ENUM ('active', 'expired');

-- CreateEnum
CREATE TYPE "RewardContentType" AS ENUM ('text', 'image', 'link');

-- AlterTable
ALTER TABLE "Platform" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "previewImage" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "RewardStatus" NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE "RewardContent" (
    "id" SERIAL NOT NULL,
    "type" "RewardContentType" NOT NULL,
    "value" TEXT,
    "href" TEXT,
    "label" TEXT,
    "imageSrc" TEXT,
    "imageAlt" TEXT,
    "rewardId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RewardContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RewardContent_rewardId_idx" ON "RewardContent"("rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_slug_key" ON "Reward"("slug");

-- CreateIndex
CREATE INDEX "Reward_platformId_idx" ON "Reward"("platformId");

-- CreateIndex
CREATE INDEX "Reward_status_idx" ON "Reward"("status");

-- AddForeignKey
ALTER TABLE "RewardContent" ADD CONSTRAINT "RewardContent_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
