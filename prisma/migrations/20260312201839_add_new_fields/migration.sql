-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "claimUrl" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "image" TEXT;
