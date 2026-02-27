import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CopyCode from "@/components/CopyCode";
import { getLocalizedClashRoyaleRewards } from "@/lib/siteConfig";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizePath,
  locales,
  type Locale,
} from "@/lib/i18n";

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
    locale: string;
    slug: string;
  }>;
};

function getRewardFromConfig(slug: string, locale: Locale) {
  const reward = getLocalizedClashRoyaleRewards(locale).find(
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale: requestedLocale } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  const t = getDictionary(locale);
  const reward = getRewardFromConfig(slug, locale);
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

  const reward = getRewardFromConfig(slug, locale);
  if (!reward) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Button variant={"link"} asChild>
          <Link href={localizePath(locale, "/games/clash-royale")} data-trigger-popunder="true">
            <ArrowLeft />
            <span>{t.games.back}</span>
          </Link>
        </Button>
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={reward.platform.image || "/clash-royale.jpg"}
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
