import { storageUrl } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import { type GameSlug } from "@/types/games";
import { useEffect, useState } from "react";
import { isVisited, subscribeToVisitedRewards } from "@/lib/visitedRewards";
import { Share2 } from "lucide-react";

const SMARTLINK_URL = "https://omg10.com/4/11769152";

interface RewardItemProps {
  src?: string;
  title: string;
  platform: { name: string };
  slug: string;
  game: GameSlug;
  locale: Locale;
  claimUrl?: string | null;
}

const RewardItem = ({
  src,
  title,
  platform,
  slug,
  game,
  locale,
  claimUrl,
}: RewardItemProps) => {
  const t = getDictionary(locale);
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    setVisited(isVisited(game, slug));
    const unsub = subscribeToVisitedRewards(() => {
      setVisited(isVisited(game, slug));
    });
    return unsub;
  }, [game, slug]);

  const handleClaimClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!claimUrl) return;

    const chance = Math.floor(Math.random() * 5) + 1;
    if (chance === 1) {
      window.open(SMARTLINK_URL, "_blank");
      setTimeout(() => {
        window.open(claimUrl, "_blank");
      }, 100);
    } else {
      window.open(claimUrl, "_blank");
    }
  };

  return (
    <li className="relative flex flex-col rounded-lg border bg-card overflow-hidden">
      {visited && (
        <span className="absolute top-0 right-0 z-10 bg-primary text-primary-foreground text-[8px] font-bold px-1 py-0.5 rounded-bl-md rounded-tr-md uppercase tracking-tighter">
          {t.common.visited}
        </span>
      )}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          className="object-cover"
          src={
            src ||
            (game === "genshin-impact"
              ? storageUrl("images/genshin-impact/logo.png")
              : storageUrl("images/clash-royale/chest-image.png"))
          }
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
          alt={platform.name}
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-1 p-1.5 sm:p-2">
        <div className="min-h-0">
          <h2 className="font-bold font-concert-one text-[10px] sm:text-xs truncate">
            {platform.name}
          </h2>
          <p className="text-muted-foreground text-[9px] sm:text-[10px] line-clamp-2">
            {title}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          {claimUrl && (
            <Button
              size="sm"
              className="text-[9px] sm:text-[10px] w-full h-6 sm:h-7 bg-green-600 hover:bg-green-700 px-1"
              onClick={handleClaimClick}
            >
              Claim Now
            </Button>
          )}
          <div className="flex gap-1">
            <Button size="sm" className="text-[9px] sm:text-[10px] flex-1 min-w-0 h-6 sm:h-7 px-1" asChild>
              <Link
                prefetch={false}
                href={localizePath(locale, `/games/${game}/rewards/${slug}`)}
                className="truncate"
              >
                {t.common.learnMore}
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="px-1.5 shrink-0 h-6 sm:h-7"
              onClick={() => {
                const shareData = {
                  title: `${title} - ${platform.name}`,
                  text: `Check out this reward: ${title}`,
                  url:
                    typeof window !== "undefined"
                      ? `${window.location.origin}/games/${game}/rewards/${slug}`
                      : "",
                };
                if (navigator.share) {
                  navigator.share(shareData);
                } else {
                  navigator.clipboard.writeText(shareData.url);
                  alert("Link copied to clipboard!");
                }
              }}
            >
              <Share2 className="w-2.5 h-2.5" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RewardItem;
