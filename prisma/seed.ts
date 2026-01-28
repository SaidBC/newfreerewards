import 'dotenv/config';
import prisma from '../lib/prisma';
import { PlatformType } from '@prisma/client';

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data
  await prisma.reward.deleteMany();
  await prisma.platform.deleteMany();

  // Create Platforms
  const clashRoyale = await prisma.platform.create({
    data: {
      name: 'Clash Royale',
      slug: 'clash-royale',
      type: PlatformType.GAME,
    },
  });

  const brawlStars = await prisma.platform.create({
    data: {
      name: 'Brawl Stars',
      slug: 'brawl-stars',
      type: PlatformType.GAME,
    },
  });

  const surveyApp = await prisma.platform.create({
    data: {
      name: 'Survey App',
      slug: 'survey-app',
      type: PlatformType.SERVICE,
    },
  });

  // Create Rewards
  await prisma.reward.create({
    data: {
      title: 'Free Tower Skin',
      description: 'Get a free, limited-edition tower skin for the current season.',
      platformId: clashRoyale.id,
    },
  });

  await prisma.reward.create({
    data: {
      title: '100 Free Gems',
      description: 'Claim 100 free gems to spend in the Brawl Stars shop.',
      platformId: brawlStars.id,
    },
  });

  await prisma.reward.create({
    data: {
      title: 'Earn $5 with Survey App',
      description: 'Complete a short survey and earn a $5 reward.',
      platformId: surveyApp.id,
    },
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
