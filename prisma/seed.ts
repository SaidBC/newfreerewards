import "dotenv/config";
import { 
  getLocalizedClashRoyaleRewards, 
  getLocalizedClashOfClansRewards,
  getLocalizedBrawlStarsRewards,
  getLocalizedGenshinImpactRewards,
  getLocalizedHonkaiStarRailRewards
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
  const clashRoyale = await prisma.platform.create({
    data: {
      name: "Clash Royale",
      slug: "clash-royale",
      image: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg",
      type: "GAME",
    },
  });

  const clashOfClans = await prisma.platform.create({
    data: {
      name: "Clash of Clans",
      slug: "clash-of-clans",
      image: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-of-clans/Clash_of_Clans.webp",
      type: "GAME",
    },
  });

  const brawlStars = await prisma.platform.create({
    data: {
      name: "Brawl Stars",
      slug: "brawl-stars",
      image: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/brawl-stars/logo.jpeg",
      type: "GAME",
    },
  });

  const genshinImpact = await prisma.platform.create({
    data: {
      name: "Genshin Impact",
      slug: "genshin-impact",
      image: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/genshin-impact/logo.png",
      type: "GAME",
    },
  });

  const honkaiStarRail = await prisma.platform.create({
    data: {
      name: "Honkai: Star Rail",
      slug: "honkai-star-rail",
      image: "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/honkai-star-rail/logo.png",
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
  await seedRewards(getLocalizedClashRoyaleRewards("en"), clashRoyale.id);
  await seedRewards(getLocalizedClashOfClansRewards("en"), clashOfClans.id);
  await seedRewards(getLocalizedBrawlStarsRewards("en"), brawlStars.id);
  await seedRewards(getLocalizedGenshinImpactRewards("en"), genshinImpact.id);
  await seedRewards(getLocalizedHonkaiStarRailRewards("en"), honkaiStarRail.id);

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
