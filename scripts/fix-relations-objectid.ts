/**
 * Convert foreign key fields from hex strings to proper MongoDB ObjectId type.
 *
 * After adding @db.ObjectId to foreign key fields in schema.prisma,
 * existing data that was stored as hex strings (via toHexString()) needs
 * to be converted to actual ObjectId binary values.
 *
 * Usage: npx ts-node scripts/fix-relations-objectid.ts
 */

import { MongoClient, ObjectId } from "mongodb";

const MONGO_URL = process.env.MONGODB_URL!;
if (!MONGO_URL) throw new Error("Missing MONGODB_URL in .env");

const mongoDbName = new URL(MONGO_URL).pathname.replace("/", "");
if (!mongoDbName) throw new Error("MongoDB URL must include a database name");

async function main() {
  const mongoClient = new MongoClient(MONGO_URL);
  await mongoClient.connect();
  const db = mongoClient.db(mongoDbName);
  console.log(`Connected to MongoDB (db: ${mongoDbName})`);

  // 1. Reward.platformId → ObjectId
  const rewardDocs = await db.collection("Reward").find({}).toArray();
  let updated = 0;
  for (const doc of rewardDocs) {
    if (typeof doc.platformId === "string" && doc.platformId.length === 24) {
      await db
        .collection("Reward")
        .updateOne(
          { _id: doc._id },
          { $set: { platformId: new ObjectId(doc.platformId) } },
        );
      updated++;
    }
  }
  console.log(`✓ Updated ${updated} Reward.platformId → ObjectId`);

  // 2. RewardContent.rewardId → ObjectId
  const contentDocs = await db.collection("RewardContent").find({}).toArray();
  let contentUpdated = 0;
  for (const doc of contentDocs) {
    if (typeof doc.rewardId === "string" && doc.rewardId.length === 24) {
      await db
        .collection("RewardContent")
        .updateOne(
          { _id: doc._id },
          { $set: { rewardId: new ObjectId(doc.rewardId) } },
        );
      contentUpdated++;
    }
  }
  console.log(`✓ Updated ${contentUpdated} RewardContent.rewardId → ObjectId`);

  // 3. RewardReaction.rewardId → ObjectId
  const reactionDocs = await db.collection("RewardReaction").find({}).toArray();
  let reactionUpdated = 0;
  for (const doc of reactionDocs) {
    if (typeof doc.rewardId === "string" && doc.rewardId.length === 24) {
      await db
        .collection("RewardReaction")
        .updateOne(
          { _id: doc._id },
          { $set: { rewardId: new ObjectId(doc.rewardId) } },
        );
      reactionUpdated++;
    }
  }
  console.log(
    `✓ Updated ${reactionUpdated} RewardReaction.rewardId → ObjectId`,
  );

  // 4. RewardReport.rewardId → ObjectId
  const reportDocs = await db.collection("RewardReport").find({}).toArray();
  let reportUpdated = 0;
  for (const doc of reportDocs) {
    if (typeof doc.rewardId === "string" && doc.rewardId.length === 24) {
      await db
        .collection("RewardReport")
        .updateOne(
          { _id: doc._id },
          { $set: { rewardId: new ObjectId(doc.rewardId) } },
        );
      reportUpdated++;
    }
  }
  console.log(`✓ Updated ${reportUpdated} RewardReport.rewardId → ObjectId`);

  // ── Summary ──
  const total = updated + contentUpdated + reactionUpdated + reportUpdated;
  console.log(`\n✅ Done! Total documents updated: ${total}`);

  await mongoClient.close();
}

main().catch((err) => {
  console.error("\n❌ Failed:", err.message);
  process.exit(1);
});
