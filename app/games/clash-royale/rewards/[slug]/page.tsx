import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CopyCode from "@/components/CopyCode";
import { getLocalizedClashRoyaleRewards } from "@/lib/siteConfig";
import { locales, localizePath } from "@/lib/i18n";

export const dynamic = "force-static";

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
    slug: string;
  }>;
};

type Props = {
  params: Promise<{ slug: string }>;
};

function getRewardFromConfig(slug: string) {
  const reward = getLocalizedClashRoyaleRewards("en").find(
    (item) => item.slug === slug
  );

  if (!reward) return null;

  return {
    slug: reward.slug,
    title: reward.name,
    description: reward.description,
    platform: {
      name: reward.platform.name,
      image: reward.platform.src,
    },
    contents: reward.content.map((content) => ({
      type: content.type,
      value: content.value ?? null,
      href: content.href ?? null,
      label: content.label ?? null,
      imageSrc: content.src ?? null,
      imageAlt: content.alt ?? null,
    })),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reward = getRewardFromConfig(slug);
  const platformName = "Clash Royale";
  const rewardName = reward?.title || "Unknown Reward";

  const rewardPath = `/games/clash-royale/rewards/${slug}`;

  return {
    title: `${rewardName} – Free Reward on ${platformName}`,
    description: `Step-by-step guide to claim the ${rewardName} reward on ${platformName}.`,
    alternates: {
      canonical: rewardPath,
      languages: Object.fromEntries(
        locales.map((locale) => [locale, localizePath(locale, rewardPath)])
      ),
    },
    openGraph: {
      title: `${rewardName} – ${platformName} Reward`,
      description: `Step-by-step guide to claim the ${rewardName} reward on ${platformName}.`,
      url: rewardPath,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return getLocalizedClashRoyaleRewards("en").map((reward) => ({
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
      const isQrCode =
        (block.imageAlt || "").toLowerCase().includes("qr") ||
        (block.imageSrc || "").toLowerCase().includes("qr");
      return (
        <div
          key={index}
          className={`relative mt-2 overflow-hidden rounded-lg border ${
            isQrCode ? "max-w-[200px]" : ""
          }`}
        >
          <Image
            src={block.imageSrc || "/images/clash-royale/chest-image.png"}
            alt={block.imageAlt || "reward image"}
            width={isQrCode ? 200 : 400}
            height={isQrCode ? 200 : 400}
            className="h-auto w-full object-contain"
          />
        </div>
      );

    case "code":
      return <CopyCode key={index} text={block.value || ""} />;

    case "link":
      return (
        <Button key={index} asChild className="mt-2 w-full sm:w-fit font-concert-one">
          <a href={block.href || "#"} target="_blank" rel="noopener noreferrer">
            {block.label || "Claim Reward"}
          </a>
        </Button>
      );

    default:
      return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const reward = getRewardFromConfig(slug);
  if (!reward) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Button variant={"link"} asChild>
          <Link href={"/games/clash-royale"} data-trigger-popunder="true">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back</span>
          </Link>
        </Button>
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={reward.platform.image || "/images/clash-royale/clash-royale.jpg"}
            width={48}
            height={48}
            alt={reward.platform.name}
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-concert-one uppercase">
              Free {reward.platform.name} Rewards
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              {reward.title}
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-muted-foreground text-lg italic">
          {reward.description}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 flex flex-col gap-8">
        <div className="space-y-8 rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="font-concert-one text-xl uppercase italic">Step-by-step guide</h2>
          </div>

          <div className="space-y-6">{reward.contents.map(renderBlock)}</div>
        </div>
      </section>
    </main>
  );
}
