"use client";

import { storageUrl } from "@/lib/storage";
import RewardEngagementBar from "@/components/rewards/RewardEngagementBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CopyCode from "@/components/CopyCode";
import { localizePath, type Locale } from "@/lib/i18n";
import AdsComponent from "@/components/AdsComponent";
import type { RewardEngagementSummary } from "@/lib/rewardEngagementService";

export interface RewardDetailViewClientProps {
  reward: any;
  locale: Locale;
  t: any;
  isPreview?: boolean;
  initialEngagement?: RewardEngagementSummary | null;
}

export default function RewardDetailViewClient({ reward, locale, t, isPreview = false, initialEngagement }: RewardDetailViewClientProps) {
  if (!reward) return null;

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={index} className="text-muted-foreground leading-relaxed">
            {block.value}
          </p>
        );
      case "image":
        const isQrCode =
          (block.alt || "").toLowerCase().includes("qr") ||
          (block.src || "").toLowerCase().includes("qr") ||
          (block.imageAlt || "").toLowerCase().includes("qr") ||
          (block.imageSrc || "").toLowerCase().includes("qr");
        
        const src = block.src || block.imageSrc || storageUrl(`images/${reward.platform.slug}/logo.jpeg`);
        const alt = block.alt || block.imageAlt || "reward step";

        return (
          <div key={index} className={`relative mt-2 overflow-hidden rounded-lg border ${isQrCode ? "max-w-[200px]" : ""}`}>
            <Image
              src={src}
              alt={alt}
              width={isQrCode ? 200 : 800}
              height={isQrCode ? 200 : 450}
              className="h-auto w-full object-contain"
              unoptimized={isPreview}
            />
          </div>
        );
      case "link":
        return (
          <Button key={index} asChild className="mt-2 w-full sm:w-fit font-concert-one">
            <a href={block.href || "#"} target="_blank" rel="noopener noreferrer">
              {block.label || "Claim Reward"}
            </a>
          </Button>
        );
      case "code":
        return (
          <div key={index} className="mt-2 text-left">
            <CopyCode text={block.value || ""} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        {!isPreview && (
          <Button variant={"link"} asChild className="mb-4">
            <Link prefetch={false} href={localizePath(locale, `/games/${reward.platform.slug}`)} data-trigger-popunder="true">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>{t.games.back}</span>
            </Link>
          </Button>
        )}
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={reward.platform.image  ? storageUrl(reward.platform.image) : storageUrl(`images/${reward.platform.slug}/logo.jpeg`)}
            width={48}
            height={48}
            alt={reward.platform.name}
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-concert-one uppercase leading-tight">
              Free {reward.platform.name} Rewards
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              {reward.name || reward.title}
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-muted-foreground text-lg italic">
          {reward.description}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 flex flex-col gap-8">
        {!isPreview && <RewardEngagementBar rewardId={reward.id} locale={locale} initialSummary={initialEngagement} />}
        
        {reward.platform.slug === "clash-royale" && (
          <AdsComponent
            link="https://lootbar.gg/top-up/clash-royale?aff_short=newfreerewards"
            imageSrc="https://res.cloudinary.com/dctrgw4fo/image/upload/images/affiliate/lootbarClashRoyaleOffers.png"
            alt="Top up Clash Royale on Lootbar.gg Offers"
          />
        )}
        {reward.platform.slug === "brawl-stars" && (
          <AdsComponent />
        )}

        <div className="space-y-8 rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="font-concert-one text-xl uppercase italic text-left">{t.games.stepByStepGuide}</h2>
          </div>

          <div className="space-y-6">
            {(reward.content || []).map((block: any, index: number) => (
              <div key={index} className="flex flex-col gap-4 text-left">
                {renderBlock(block, index)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
