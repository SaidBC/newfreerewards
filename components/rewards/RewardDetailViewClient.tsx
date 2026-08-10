"use client";

import { storageUrl } from "@/lib/storage";
import RewardEngagementBar from "@/components/rewards/RewardEngagementBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CopyCode from "@/components/CopyCode";
import { localizePath, type Locale } from "@/lib/i18n";
import type { RewardEngagementSummary } from "@/lib/rewardEngagementService";
import { useEffect, useState } from "react";
import { markRewardVisited } from "@/lib/visitedRewards";
import QRCode from "qrcode";

function QRCodeBlock({ block }: { block: any }) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!block.href) return;
    QRCode.toDataURL(block.href, {
      width: 400,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    }).then(setQrDataUrl);
  }, [block.href]);

  if (!qrDataUrl) {
    return (
      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
          No URL provided for QR code
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      <div className="relative bg-white p-3 rounded-xl border-2 border-gray-200 shadow-lg">
        <div className="relative rounded-lg overflow-hidden">
          <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 block" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-1"
            style={{ boxShadow: "0 0 0 2px #fff" }}
          >
            <img
              src="/images/card-studio/nfr-logo.jpg"
              alt="NFR"
              className="w-10 h-10 rounded-md block"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
      {block.label && (
        <div className="flex items-center gap-2 text-sm font-semibold">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="3" height="3" />
          </svg>
          {block.label}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-center max-w-md">
        Scan this QR code with your phone camera or click the button below to
        open the reward link directly.
      </p>
    </div>
  );
}

export interface RewardDetailViewClientProps {
  reward: any;
  locale: Locale;
  t: any;
  isPreview?: boolean;
  initialEngagement?: RewardEngagementSummary | null;
}

export default function RewardDetailViewClient({
  reward,
  locale,
  t,
  isPreview = false,
  initialEngagement,
}: RewardDetailViewClientProps) {
  useEffect(() => {
    if (!isPreview && reward?.platform?.slug && reward?.slug) {
      markRewardVisited(reward.platform.slug, reward.slug);
    }
  }, [isPreview, reward?.platform?.slug, reward?.slug]);

  const [relatedRewards, setRelatedRewards] = useState<any[]>([]);

  useEffect(() => {
    if (reward?.platform?.id && !isPreview) {
      fetch(
        `/api/rewards?platformId=${reward.platform.id}&excludeId=${reward.id}&limit=5`,
      )
        .then((res) => res.json())
        .then((data) => setRelatedRewards(data.rewards || []))
        .catch((err) => console.error("Failed to fetch related rewards:", err));
    }
  }, [reward?.platform?.id, reward?.id, isPreview]);

  if (!reward) return null;

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={index} className="text-muted-foreground leading-relaxed">
            {block.value}
          </p>
        );
      case "italic":
        return (
          <p
            key={index}
            className="text-muted-foreground leading-relaxed italic"
          >
            {block.value}
          </p>
        );
      case "title":
        const TitleTag = block.titleLevel || "h2";
        return (
          <TitleTag
            key={index}
            className={`font-concert-one ${block.titleLevel === "h2" ? "text-2xl" : block.titleLevel === "h3" ? "text-xl" : "text-lg"} font-bold uppercase italic text-left mt-6 mb-4`}
          >
            {block.value}
          </TitleTag>
        );
      case "list":
        const ListTag = block.listType === "ordered" ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={`space-y-2 ml-4 ${block.listType === "ordered" ? "list-decimal" : "list-disc"}`}
          >
            {(block.listItems || [])
              .filter((item: string) => item.trim())
              .map((item: string, itemIndex: number) => (
                <li
                  key={itemIndex}
                  className="text-muted-foreground leading-relaxed"
                >
                  {item}
                </li>
              ))}
          </ListTag>
        );
      case "image":
        const isQrCode =
          (block.alt || "").toLowerCase().includes("qr") ||
          (block.src || "").toLowerCase().includes("qr") ||
          (block.imageAlt || "").toLowerCase().includes("qr") ||
          (block.imageSrc || "").toLowerCase().includes("qr");

        const src =
          block.src ||
          block.imageSrc ||
          storageUrl(`images/${reward.platform.slug}/logo.jpeg`);
        const alt = block.alt || block.imageAlt || "reward step";

        return (
          <div
            key={index}
            className={`relative mt-2 overflow-hidden rounded-lg border ${isQrCode ? "max-w-[200px]" : ""}`}
          >
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
          <Button
            key={index}
            asChild
            className="mt-2 w-full sm:w-fit font-concert-one"
          >
            <a
              href={block.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
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
      case "qr":
        return <QRCodeBlock block={block} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        {!isPreview && (
          <Button variant={"link"} asChild className="mb-4">
            <Link
              prefetch={false}
              href={localizePath(locale, `/games/${reward.platform.slug}`)}
              data-trigger-popunder="true"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>{t.games.back}</span>
            </Link>
          </Button>
        )}
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={
              reward.platform.image
                ? storageUrl(reward.platform.image)
                : storageUrl(`images/${reward.platform.slug}/logo.jpeg`)
            }
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
        {!isPreview && (
          <RewardEngagementBar
            rewardId={reward.id}
            locale={locale}
            initialSummary={initialEngagement}
          />
        )}

        {/* Status Section */}
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="font-concert-one text-xl uppercase italic text-left">
              Reward Status
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${reward.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
              >
                {reward.status}
              </span>
            </div>
            {reward.expiresAt && (
              <div>
                <p className="text-sm text-muted-foreground">Expires</p>
                <p className="mt-1 font-semibold">
                  {new Date(reward.expiresAt).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="mt-1 font-semibold">
                {new Date(reward.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-8 rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <h2 className="font-concert-one text-xl uppercase italic text-left">
              {t.games.stepByStepGuide}
            </h2>
          </div>

          <div className="space-y-6">
            {(reward.content || []).map((block: any, index: number) => (
              <div key={index} className="flex flex-col gap-4 text-left">
                {renderBlock(block, index)}
              </div>
            ))}
          </div>
        </div>

        {/* Related Rewards Section */}
        {relatedRewards.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-concert-one">Related Rewards</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedRewards.map((relatedReward: any) => (
                <Link
                  key={relatedReward.id}
                  href={localizePath(
                    locale,
                    `/games/${reward.platform.slug}/rewards/${relatedReward.slug}`,
                  )}
                  className="group rounded-lg border bg-card p-3 hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={
                      relatedReward.previewImage ||
                      relatedReward.image ||
                      storageUrl(`images/${reward.platform.slug}/logo.jpeg`)
                    }
                    alt={relatedReward.title}
                    width={125}
                    height={125}
                    className="rounded-md object-cover h-24 w-24 mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = storageUrl(
                        `images/${reward.platform.slug}/logo.jpeg`,
                      );
                    }}
                  />
                  <h4 className="mt-2 text-sm font-semibold text-center line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedReward.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
