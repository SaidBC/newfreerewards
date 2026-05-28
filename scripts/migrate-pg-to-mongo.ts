/**
 * Migration script: PostgreSQL (Prisma) → MongoDB (Prisma)
 *
 * Usage:
 *   node migrate-pg-to-mongo.mjs
 *
 * Requires both DATABASE_URL and MONGODB_URL in your .env file.
 * Will ABORT if any collection in MongoDB already has documents.
 */

import { config } from "dotenv";
import pg from "pg";
import { MongoClient, ObjectId } from "mongodb";

config(); // load .env

const PG_URL = process.env.DATABASE_URL!;
const MONGO_URL = process.env.MONGODB_URL!;

if (!PG_URL) throw new Error("Missing DATABASE_URL in .env");
if (!MONGO_URL) throw new Error("Missing MONGODB_URL in .env");

// Extract DB name from MongoDB URL
const mongoDbName = new URL(MONGO_URL).pathname.replace("/", "");
if (!mongoDbName)
  throw new Error(
    "MongoDB URL must include a database name, e.g. mongodb://host/mydb",
  );

const COLLECTIONS = [
  "Platform",
  "Reward",
  "RewardContent",
  "RewardReaction",
  "RewardReport",
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function toObjectId(pgId: string | number): ObjectId {
  // Postgres IDs are UUIDs or integers — map them to a deterministic ObjectId
  // by hashing to 12 bytes. We store the original pg id as pgId field too.
  // For simplicity: pad/truncate the string to 24 hex chars.
  const hex = Buffer.from(String(pgId).padEnd(12, "0").slice(0, 12)).toString(
    "hex",
  );
  return new ObjectId(hex);
}

function log(msg: string) {
  console.log(`[migrate] ${msg}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Connect to Postgres
  const pgClient = new pg.Client({ connectionString: PG_URL });
  await pgClient.connect();
  log("Connected to PostgreSQL");

  // Connect to MongoDB
  const mongoClient = new MongoClient(MONGO_URL);
  await mongoClient.connect();
  const db = mongoClient.db(mongoDbName);
  log(`Connected to MongoDB (db: ${mongoDbName})`);

  // ── Abort if any collection already has data ──────────────────────────────
  log("Checking MongoDB collections for existing data...");
  for (const col of COLLECTIONS) {
    const count = await db.collection(col).countDocuments();
    if (count > 0) {
      throw new Error(
        `Aborting: collection "${col}" already has ${count} document(s). ` +
          `Drop all collections first or choose upsert mode.`,
      );
    }
  }
  log("All collections are empty — safe to proceed.");

  // ── 1. Platforms ──────────────────────────────────────────────────────────
  const { rows: platforms } = await pgClient.query(`SELECT * FROM "Platform"`);
  log(`Migrating ${platforms.length} platforms...`);

  // Build a pgId → ObjectId map for foreign key resolution
  const platformIdMap = new Map();
  const platformDocs = platforms.map((row) => {
    const _id = toObjectId(row.id);
    platformIdMap.set(row.id, _id);
    return {
      _id,
      pgId: row.id,
      name: row.name,
      slug: row.slug,
      type: row.type,
      image: row.image ?? null,
      createdAt: row.createdAt ?? row.created_at ?? new Date(),
      updatedAt: row.updatedAt ?? row.updated_at ?? new Date(),
    };
  });

  if (platformDocs.length > 0) {
    await db.collection("Platform").insertMany(platformDocs);
  }
  log(`✓ Inserted ${platformDocs.length} platforms`);

  // ── 2. Rewards ────────────────────────────────────────────────────────────
  const { rows: rewards } = await pgClient.query(`SELECT * FROM "Reward"`);
  log(`Migrating ${rewards.length} rewards...`);

  const rewardIdMap = new Map();
  const rewardDocs = rewards.map((row) => {
    const _id = toObjectId(row.id);
    rewardIdMap.set(row.id, _id);
    const platformObjectId = platformIdMap.get(
      row.platformId ?? row.platform_id,
    );
    if (!platformObjectId) {
      throw new Error(
        `Reward ${row.id} references unknown platformId ${row.platformId ?? row.platform_id}`,
      );
    }
    return {
      _id,
      pgId: row.id,
      title: row.title,
      description: row.description,
      slug: row.slug,
      status: row.status,
      claimUrl: row.claimUrl ?? row.claim_url ?? null,
      expiresAt: row.expiresAt ?? row.expires_at ?? null,
      image: row.image ?? null,
      previewImage: row.previewImage ?? row.preview_image ?? null,
      translations: row.translations ?? null,
      platformId: platformObjectId.toHexString(),
      createdAt: row.createdAt ?? row.created_at ?? new Date(),
      updatedAt: row.updatedAt ?? row.updated_at ?? new Date(),
    };
  });

  if (rewardDocs.length > 0) {
    await db.collection("Reward").insertMany(rewardDocs);
  }
  log(`✓ Inserted ${rewardDocs.length} rewards`);

  // ── 3. RewardContent ──────────────────────────────────────────────────────
  const { rows: contents } = await pgClient.query(
    `SELECT * FROM "RewardContent"`,
  );
  log(`Migrating ${contents.length} reward contents...`);

  const contentDocs = contents.map((row) => {
    const rewardObjectId = rewardIdMap.get(row.rewardId ?? row.reward_id);
    if (!rewardObjectId) {
      throw new Error(
        `RewardContent ${row.id} references unknown rewardId ${row.rewardId ?? row.reward_id}`,
      );
    }
    return {
      _id: toObjectId(row.id),
      pgId: row.id,
      type: row.type,
      value: row.value ?? null,
      href: row.href ?? null,
      label: row.label ?? null,
      imageSrc: row.imageSrc ?? row.image_src ?? null,
      imageAlt: row.imageAlt ?? row.image_alt ?? null,
      order: row.order,
      translations: row.translations ?? null,
      rewardId: rewardObjectId.toHexString(),
      createdAt: row.createdAt ?? row.created_at ?? new Date(),
    };
  });

  if (contentDocs.length > 0) {
    await db.collection("RewardContent").insertMany(contentDocs);
  }
  log(`✓ Inserted ${contentDocs.length} reward contents`);

  // ── 4. RewardReactions ────────────────────────────────────────────────────
  const { rows: reactions } = await pgClient.query(
    `SELECT * FROM "RewardReaction"`,
  );
  log(`Migrating ${reactions.length} reward reactions...`);

  const reactionDocs = reactions.map((row) => {
    const rewardObjectId = rewardIdMap.get(row.rewardId ?? row.reward_id);
    if (!rewardObjectId) {
      throw new Error(
        `RewardReaction ${row.id} references unknown rewardId ${row.rewardId ?? row.reward_id}`,
      );
    }
    return {
      _id: toObjectId(row.id),
      pgId: row.id,
      reactionType: row.reactionType ?? row.reaction_type,
      visitorId: row.visitorId ?? row.visitor_id,
      rewardId: rewardObjectId.toHexString(),
      createdAt: row.createdAt ?? row.created_at ?? new Date(),
      updatedAt: row.updatedAt ?? row.updated_at ?? new Date(),
    };
  });

  if (reactionDocs.length > 0) {
    await db.collection("RewardReaction").insertMany(reactionDocs);
  }
  log(`✓ Inserted ${reactionDocs.length} reward reactions`);

  // ── 5. RewardReports ──────────────────────────────────────────────────────
  const { rows: reports } = await pgClient.query(
    `SELECT * FROM "RewardReport"`,
  );
  log(`Migrating ${reports.length} reward reports...`);

  const reportDocs = reports.map((row) => {
    const rewardObjectId = rewardIdMap.get(row.rewardId ?? row.reward_id);
    if (!rewardObjectId) {
      throw new Error(
        `RewardReport ${row.id} references unknown rewardId ${row.rewardId ?? row.reward_id}`,
      );
    }
    return {
      _id: toObjectId(row.id),
      pgId: row.id,
      reportType: row.reportType ?? row.report_type,
      visitorId: row.visitorId ?? row.visitor_id,
      reportDay: row.reportDay ?? row.report_day,
      note: row.note ?? null,
      rewardId: rewardObjectId.toHexString(),
      createdAt: row.createdAt ?? row.created_at ?? new Date(),
    };
  });

  if (reportDocs.length > 0) {
    await db.collection("RewardReport").insertMany(reportDocs);
  }
  log(`✓ Inserted ${reportDocs.length} reward reports`);

  // ── Done ──────────────────────────────────────────────────────────────────
  await pgClient.end();
  await mongoClient.close();

  console.log("\n✅ Migration complete!");
  console.log(`   Platforms:      ${platformDocs.length}`);
  console.log(`   Rewards:        ${rewardDocs.length}`);
  console.log(`   Contents:       ${contentDocs.length}`);
  console.log(`   Reactions:      ${reactionDocs.length}`);
  console.log(`   Reports:        ${reportDocs.length}`);
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
