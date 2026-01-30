import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import clientEnv from "@/utils/clientEnv";
import AdBanner from "@/components/AdBanner";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reward = await prisma.reward.findUnique({
    where: {
      slug,
    },
  });
  const platformName = "Clash Royale";
  const rewardName = !reward ? "Unkown Reward" : reward.title;
  return {
    title: `${rewardName} – Free Reward on ${platformName}`,
    description: `Step-by-step guide to claim the ${rewardName} reward on ${platformName}.`,
    openGraph: {
      title: `${rewardName} – ${platformName} Reward`,
      description: "Claim this free reward safely using the official link.",
      url: `/games/clash-royale/rewards/${slug}`,
      type: "article",
    },
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
  const rewards = await prisma.reward.findMany({
    include: { platform: true },
  });

  return rewards.map((reward) => ({
    platform: reward.platform.slug,
    slug: reward.slug,
  }));
}

function renderBlock(block: any, index: number) {
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
          src={block.imageSrc}
          alt={block.imageAlt}
          width={400}
          height={400}
        />
      );

    case "link":
      return (
        <p key={index} className="font-bold">
          <a
            href={block.href}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {block.label}
          </a>
        </p>
      );

    default:
      return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const reward = await getRewardBySlug(slug);
  if (!reward) return notFound();
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Button variant={"link"} asChild>
          <Link href={"/games/clash-royale"}>
            <ArrowLeft />
            <span>Back</span>
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
      <AdBanner
        className=" md:w-182 md:h-22.5 @[468px]:w-117 @[468px]:h-15 w-[320px] h-12.5 mx-auto my-4"
        adConfigs={[
          {
            width: 728,
            height: 90,
            apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_728X90_API_KEY,
          },
          {
            width: 468,
            height: 60,
            apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_API_KEY,
          },
          {
            width: 320,
            height: 50,
            apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_API_KEY,
          },
        ]}
      />
      {/* Blog-like Content */}
      <section className="mx-auto max-w-5xl px-4 pb-24 flex flex-col gap-6">
        {reward.contents.map(renderBlock)}
      </section>
    </main>
  );
}
