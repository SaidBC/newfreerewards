import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import CopyCode from "@/components/CopyCode";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";

type RewardContentBlock = {
  type: "text" | "image" | "code" | "link";
  value?: string | null;
  href?: string | null;
  label?: string | null;
  imageSrc?: string | null;
  imageAlt?: string | null;
};

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const reward = await prisma.reward.findUnique({
    where: {
      slug,
    },
  });
  const platformName = "Clash Royale";
  const rewardName = !reward ? "Unknown Reward" : reward.title;
  return {
    title: `${rewardName} – Free Reward on ${platformName}`,
    description: `Step-by-step guide to claim the ${rewardName} reward on ${platformName}.`,
  };
}

async function getRewardBySlug(slug: string) {
  const reward = await prisma.reward.findUnique({
    where: {
      slug,
    },
    include: {
      contents: true,
      platform: true,
    },
  });
  return reward;
}

export async function generateStaticParams() {
  const rewards = await prisma.reward.findMany();

  return rewards.map((reward) => ({
    slug: reward.slug,
  }));
}

function renderBlock(block: RewardContentBlock, index: number) {
  switch (block.type) {
    case "text":
      return (
        <p key={index} className="text-muted-foreground">
          {block.value}
        </p>
      );

    case "image":
      return (
        <Image
          key={index}
          className="rounded-lg"
          src={block.imageSrc || "/chest-image.png"}
          alt={block.imageAlt || "reward image"}
          width={400}
          height={400}
        />
      );

    case "code":
      return <CopyCode key={index} text={block.value || ""} />;

    case "link":
      return (
        <p key={index} className="font-bold">
          <a
            href={block.href || "#"}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {block.label || block.href}
          </a>
        </p>
      );

    default:
      return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { locale: requestedLocale, slug } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  const reward = await getRewardBySlug(slug);
  if (!reward) return notFound();
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Button variant={"link"} asChild>
          <Link href={localizePath(locale, "/games/clash-royale")}>
            <ArrowLeft />
            <span>{t.games.back}</span>
          </Link>
        </Button>
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={reward.platform.image!}
            width={48}
            height={48}
            alt={reward.platform.name}
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-concert-one">
              Free {reward.platform.name} Rewards
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              {reward.title}
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-muted-foreground text-lg">
          {reward.description}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 flex flex-col gap-6">
        {reward.contents.map(renderBlock)}
      </section>
    </main>
  );
}
