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
  getLocalizedGrowAGardenRewards,
  getLocalizedBlueLockRivalsRewards
} from "../lib/siteConfig";
import prisma from "../lib/prisma";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is missing in .env");
  }

  console.log("Starting non-destructive seed...");

  async function ensurePlatform(data: {
    name: string;
    slug: string;
    image: string;
    type: "GAME";
  }) {
    const platform = await prisma.platform.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
    console.log(`Ensured platform: ${platform.slug}`);
    return platform;
  }

  const clashRoyale = await ensurePlatform({
    name: "Clash Royale",
    slug: "clash-royale",
    image: storageUrl("images/clash-royale/clash-royale.jpg"),
    type: "GAME",
  });

  const clashOfClans = await ensurePlatform({
    name: "Clash of Clans",
    slug: "clash-of-clans",
    image: storageUrl("images/clash-of-clans/Clash_of_Clans.webp"),
    type: "GAME",
  });

  const brawlStars = await ensurePlatform({
    name: "Brawl Stars",
    slug: "brawl-stars",
    image: storageUrl("images/brawl-stars/logo.jpeg"),
    type: "GAME",
  });

  const genshinImpact = await ensurePlatform({
    name: "Genshin Impact",
    slug: "genshin-impact",
    image: storageUrl("images/genshin-impact/logo.png"),
    type: "GAME",
  });

  const honkaiStarRail = await ensurePlatform({
    name: "Honkai: Star Rail",
    slug: "honkai-star-rail",
    image: storageUrl("images/honkai-star-rail/logo.png"),
    type: "GAME",
  });

  const roblox = await ensurePlatform({
    name: "Roblox",
    slug: "roblox",
    image: storageUrl("images/roblox/logo.png"),
    type: "GAME",
  });

  const riseOfKingdoms = await ensurePlatform({
    name: "Rise of Kingdoms",
    slug: "rise-of-kingdoms",
    image: storageUrl("images/rise-of-kingdoms/logo.png"),
    type: "GAME",
  });

  const growAGarden = await ensurePlatform({
    name: "Grow a Garden",
    slug: "grow-a-garden",
    image: storageUrl("images/grow-a-garden/logo.webp"),
    type: "GAME",
  });

  const blueLockRivals = await ensurePlatform({
    name: "Blue Lock Rivals",
    slug: "blue-lock-rivals",
    image: storageUrl("images/blue-lock-rivals/logo.png"),
    type: "GAME",
  });

  // 2️⃣ Helper function to seed rewards
  async function seedRewards(rewards: any[], platformId: number) {
    // 1️⃣ Get current slugs from config
    const currentSlugs = rewards.map((r) => r.slug);

    // 2️⃣ Delete rewards that are no longer in config for this platform
    const platformRewards = await prisma.reward.findMany({
      where: { platformId },
      select: { id: true, slug: true },
    });

    const toDelete = platformRewards.filter((r) => !currentSlugs.includes(r.slug));

    if (toDelete.length > 0) {
      console.log(`Deleting ${toDelete.length} old rewards: ${toDelete.map((r) => r.slug).join(", ")}`);
      await prisma.reward.deleteMany({
        where: { id: { in: toDelete.map((r) => r.id) } },
      });
    }

    for (const reward of rewards) {
      const existingReward = await prisma.reward.findUnique({
        where: {
          platformId_slug: {
            platformId: platformId,
            slug: reward.slug
          }
        },
        select: { id: true, status: true },
      });

      let createdReward;
      if (existingReward) {
        console.log(`Updating existing reward: ${reward.slug}`);
        createdReward = await prisma.reward.update({
          where: { id: existingReward.id },
          data: {
            title: reward.name,
            description: reward.description,
            previewImage: reward.previewImage,
            status: existingReward.status === 'expired' ? 'expired' : reward.status,
            claimUrl:
              reward.content.find((c: any) => c.type === "link")?.href ?? null,
            image:
              reward.content.find((c: any) => c.type === "image")?.src ?? null,
          },
        });
        
        // Clear existing content to re-insert (simple way to keep it in sync)
        await prisma.rewardContent.deleteMany({
          where: { rewardId: createdReward.id },
        });
      } else {
        createdReward = await prisma.reward.create({
          data: {
            slug: reward.slug,
            title: reward.name,
            description: reward.description,
            previewImage: reward.previewImage,
            status: reward.status,
            platformId: platformId,
            claimUrl:
              reward.content.find((c: any) => c.type === "link")?.href ?? null,
            image:
              reward.content.find((c: any) => c.type === "image")?.src ?? null,
          },
        });
        console.log(`Inserted reward: ${reward.slug}`);
      }

      if (reward.content.length > 0) {
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
  await seedRewards(getLocalizedBlueLockRivalsRewards("en"), blueLockRivals.id);

  console.log("✅ Non-destructive seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
