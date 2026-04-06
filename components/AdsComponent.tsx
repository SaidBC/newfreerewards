"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

interface AdsComponentProps {
  link?: string;
  imageSrc?: string;
  alt?: string;
  className?: string;
}

export default function AdsComponent({
  link = "https://lootbar.gg/top-up/brawl-stars-top-up?aff_short=newfreerewards",
  imageSrc = "https://res.cloudinary.com/dctrgw4fo/image/upload/images/affiliate/lootbarBrawlStarsOffers.png",
  alt = "Top up Brawl Stars on Lootbar.gg Offers",
  className,
}: AdsComponentProps) {
  const handleClick = () => {
    analytics.trackExternalLink(link, "Ad Click: " + alt);
  };

  return (
    <div className={cn("my-6 flex w-full justify-center", className)}>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
      >
        <div className="relative w-full aspect-[21/9] sm:aspect-[8/3]">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover"
            unoptimized={imageSrc.startsWith("http")}
          />
        </div>
        <div className="flex items-center justify-between bg-muted px-4 py-3 text-sm font-medium text-muted-foreground sm:justify-center sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
              AD
            </span>
            <span className="hidden sm:inline">
              Top up quickly and securely on Game Store
            </span>
          </div>
          <Image
            src="https://res.cloudinary.com/dctrgw4fo/image/upload/images/affiliate/lootbarLogo.png"
            alt="Lootbar.gg Logo"
            width={100}
            height={30}
            className="object-contain"
          />
        </div>
      </Link>
    </div>
  );
}
