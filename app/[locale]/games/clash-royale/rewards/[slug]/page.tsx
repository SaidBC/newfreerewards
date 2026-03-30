import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CopyCode from "@/components/CopyCode";
import { getRewardBySlug } from "@/lib/rewardService";
import { prisma } from "@/lib/prisma";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  locales,
  type Locale,
} from "@/lib/i18n";

export const dynamic = "force-static";
export const revalidate = 3600;
export const dynamicParams = true;

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

async function getRewardFromDB(platform: string, slug: string, locale: Locale) {
  return await getRewardBySlug(platform, slug, locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  const t = getDictionary(locale);
  const reward = await getRewardFromDB("clash-royale", slug, locale);
  const platformName = "Clash Royale";
  const rewardName = reward?.title || "Unknown Reward";

  const rewardPath = `/games/clash-royale/rewards/${slug}`;

  return {
    title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
    description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
    alternates: {
      canonical: localizePath(locale, rewardPath),
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          localizePath(supportedLocale, rewardPath),
        ])
      ),
    },
    openGraph: {
      title: `${rewardName} – ${t.seo.rewardMetaPrefix} ${platformName}`,
      description: `${t.seo.rewardMetaDescriptionPrefix} ${rewardName} ${t.seo.rewardMetaPrefix} ${platformName}.`,
      url: localizePath(locale, rewardPath),
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const rewards = await prisma.reward.findMany({
    where: { platform: { slug: "clash-royale" } },
    select: { slug: true },
  });

  for (const locale of locales) {
    for (const reward of rewards) {
      params.push({
        locale,
        slug: reward.slug,
      });
    }
  }

  return params;
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
            src={block.imageSrc || "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/chest-image.png"}
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
  const { locale: requestedLocale, slug } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = getDictionary(locale);

  const reward = await getRewardFromDB("clash-royale", slug, locale);
  if (!reward) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Button variant={"link"} asChild>
          <Link prefetch={false} href={localizePath(locale, "/games/clash-royale")} data-trigger-popunder="true">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>{t.games.back}</span>
          </Link>
        </Button>
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={reward.platform.image || reward.platform.src || "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg"}
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
            <h2 className="font-concert-one text-xl uppercase italic">{t.games.stepByStepGuide}</h2>
          </div>

          <div className="space-y-6">{reward.content.map(renderBlock)}</div>
        </div>
      </section>
    </main>
  );
}
