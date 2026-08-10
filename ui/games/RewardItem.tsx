import { storageUrl } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import { type GameSlug } from "@/types/games";
import { useEffect, useState } from "react";
import { isVisited, subscribeToVisitedRewards } from "@/lib/visitedRewards";
import { Share2 } from "lucide-react";

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

  return (
    <li className="relative">
      {visited && (
        <span className="absolute top-0 right-0 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-bl-md rounded-tr-md uppercase tracking-tighter">
          {t.common.visited}
        </span>
      )}
      <Image
        className="rounded-md object-cover h-32 w-32"
        src={
          src ||
          (game === "genshin-impact"
            ? storageUrl("images/genshin-impact/logo.png")
            : storageUrl("images/clash-royale/chest-image.png"))
        }
        width={125}
        height={125}
        alt={platform.name}
        unoptimized
      />
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-bold font-concert-one text-sm">
            {platform.name}
          </h2>
          <p className="text-muted-foreground text-xs line-clamp-2">{title}</p>
        </div>

        <div className="flex flex-col gap-2">
          {claimUrl && (
            <Button
              size={"sm"}
              className="text-xs w-full bg-green-600 hover:bg-green-700"
              asChild
            >
              <a href={claimUrl} target="_blank" rel="noopener noreferrer">
                Claim Now
              </a>
            </Button>
          )}
          <div className="flex gap-2">
            <Button size={"sm"} className="text-xs flex-1" asChild>
              <Link
                prefetch={false}
                href={localizePath(locale, `/games/${game}/rewards/${slug}`)}
              >
                {t.common.learnMore}
              </Link>
            </Button>
            <Button
              size={"sm"}
              variant="outline"
              className="text-xs px-2"
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
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RewardItem;
