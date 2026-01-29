import "dotenv/config";
import siteConfig from "../lib/siteConfig";
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

  // 1️⃣ Create platform (Clash Royale only)
  const clashRoyale = await prisma.platform.create({
    data: {
      name: "Clash Royale",
      slug: "clash-royale",
      image: "/clash-royale.jpg",
      type: "GAME",
    },
  });

  const rewards = siteConfig.clashroyale.rewards;

  // 3️⃣ Insert rewards + contents
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
        platformId: clashRoyale.id,
      },
    });

    // delete old content to avoid duplicates
    await prisma.rewardContent.deleteMany({
      where: { rewardId: createdReward.id },
    });

    // create content blocks
    await prisma.rewardContent.createMany({
      data: reward.content.map((c, index) => ({
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

  console.log("✅ Clash Royale platform and rewards seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
