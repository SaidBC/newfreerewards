import { storageUrl } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import { type GameSlug } from "@/types/games";
import { useEffect, useState } from "react";
import { isVisited, subscribeToVisitedRewards } from "@/lib/visitedRewards";

interface RewardItemProps {
  src?: string;
  title: string;
  platform: { name: string };
  slug: string;
  game: GameSlug;
  locale: Locale;
}

const RewardItem = ({
  src,
  title,
  platform,
  slug,
  game,
  locale,
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
      />
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-bold font-concert-one">{platform.name}</h2>
          <p className="text-muted-foreground text-xs">{title}</p>
        </div>

        <Button size={"sm"} className="text-xs w-fit" asChild>
          <Link
            prefetch={false}
            href={localizePath(locale, `/games/${game}/rewards/${slug}`)}
          >
            {t.common.learnMore}
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default RewardItem;
