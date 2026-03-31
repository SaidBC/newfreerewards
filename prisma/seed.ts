import "dotenv/config";
import { storageUrl } from "../lib/storage";
import {
  getLocalizedClashRoyaleRewards, 
  getLocalizedClashOfClansRewards,
  getLocalizedBrawlStarsRewards,
  getLocalizedGenshinImpactRewards,
  getLocalizedHonkaiStarRailRewards,
  getLocalizedRobloxRewards,
  getLocalizedRiseOfKingdomsRewards,
  getLocalizedGrowAGardenRewards
} from "../lib/siteConfig";
import prisma from "../lib/prisma";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is missing in .env");
  }

  console.log("Deleting proccess started ... ");
  await prisma.platform.deleteMany({});
  await prisma.rewardContent.deleteMany({});
  await prisma.reward.deleteMany({});

  console.log("DB Deleted successfully");

  // 1️⃣ Create platforms
  console.log("Creating platforms...");
  const clashRoyale = await prisma.platform.create({
    data: {
      name: "Clash Royale",
      slug: "clash-royale",
      image: storageUrl("images/clash-royale/clash-royale.jpg"),
      type: "GAME",
    },
  });

  const clashOfClans = await prisma.platform.create({
    data: {
      name: "Clash of Clans",
      slug: "clash-of-clans",
      image: storageUrl("images/clash-of-clans/Clash_of_Clans.webp"),
      type: "GAME",
    },
  });

  const brawlStars = await prisma.platform.create({
    data: {
      name: "Brawl Stars",
      slug: "brawl-stars",
      image: storageUrl("images/brawl-stars/logo.jpeg"),
      type: "GAME",
    },
  });

  const genshinImpact = await prisma.platform.create({
    data: {
      name: "Genshin Impact",
      slug: "genshin-impact",
      image: storageUrl("images/genshin-impact/logo.png"),
      type: "GAME",
    },
  });

  const honkaiStarRail = await prisma.platform.create({
    data: {
      name: "Honkai: Star Rail",
      slug: "honkai-star-rail",
      image: storageUrl("images/honkai-star-rail/logo.png"),
      type: "GAME",
    },
  });
  
  const roblox = await prisma.platform.create({
    data: {
      name: "Roblox",
      slug: "roblox",
      image: storageUrl("images/roblox/logo.png"),
      type: "GAME",
    },
  });

  const riseOfKingdoms = await prisma.platform.create({
    data: {
      name: "Rise of Kingdoms",
      slug: "rise-of-kingdoms",
      image: storageUrl("images/rise-of-kingdoms/logo.png"),
      type: "GAME",
    },
  });

  const growAGarden = await prisma.platform.create({
    data: {
      name: "Grow a Garden",
      slug: "grow-a-garden",
      image: storageUrl("images/grow-a-garden/logo.webp"),
      type: "GAME",
    },
  });

  // 2️⃣ Helper function to seed rewards
  async function seedRewards(rewards: any[], platformId: number) {
    for (const reward of rewards) {
      const createdReward = await prisma.reward.upsert({
        where: { slug: reward.slug },
        update: {},
        create: {
          slug: reward.slug,
          title: reward.name,
          description: reward.description,
          previewImage: reward.previewImage,
          status: reward.status,
          platformId: platformId,
          claimUrl: reward.content.find((c: any) => c.type === "link")?.href ?? null,
          image: reward.content.find((c: any) => c.type === "image")?.src ?? null,
        },
      });

      // delete old content to avoid duplicates
      await prisma.rewardContent.deleteMany({
        where: { rewardId: createdReward.id },
      });

      // create content blocks
      await prisma.rewardContent.createMany({
        data: reward.content.map((c: any, index: number) => ({
          rewardId: createdReward.id,
          order: index,
          type: c.type,
          value: c.value ?? null,
          href: c.href ?? null,
          label: c.label ?? null,
          imageSrc: c.src ?? null,
          imageAlt: c.alt ?? null,
        })),
      });
    }
  }

  // 3️⃣ Seed all games
  console.log("Seeding Clash Royale...");
  await seedRewards(getLocalizedClashRoyaleRewards("en"), clashRoyale.id);
  console.log("Seeding Clash of Clans...");
  await seedRewards(getLocalizedClashOfClansRewards("en"), clashOfClans.id);
  console.log("Seeding Brawl Stars...");
  await seedRewards(getLocalizedBrawlStarsRewards("en"), brawlStars.id);
  await seedRewards(getLocalizedGenshinImpactRewards("en"), genshinImpact.id);
  await seedRewards(getLocalizedHonkaiStarRailRewards("en"), honkaiStarRail.id);
  await seedRewards(getLocalizedRobloxRewards("en"), roblox.id);
  await seedRewards(getLocalizedRiseOfKingdomsRewards("en"), riseOfKingdoms.id);
  await seedRewards(getLocalizedGrowAGardenRewards("en"), growAGarden.id);

  console.log("✅ Clash Royale, Clash of Clans, Brawl Stars, and Genshin Impact platforms and rewards seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
