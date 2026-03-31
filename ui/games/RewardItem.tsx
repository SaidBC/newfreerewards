import { storageUrl } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";

interface RewardItemProps {
  src?: string;
  title: string;
  platform: { name: string };
  slug: string;
  game: "clash-royale" | "clash-of-clans" | "brawl-stars" | "genshin-impact" | "honkai-star-rail" | "roblox" | "rise-of-kingdoms" | "grow-a-garden";
  locale: Locale;
}

const RewardItem = ({ src, title, platform, slug, game, locale }: RewardItemProps) => {
  const t = getDictionary(locale);

  return (
    <li>
      <Image
        className="rounded-md object-cover h-32 w-32"
        src={src || (game === "genshin-impact" ? storageUrl("images/genshin-impact/logo.png") : storageUrl("images/clash-royale/chest-image.png"))}
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
          <Link prefetch={false} href={localizePath(locale, `/games/${game}/rewards/${slug}`)}>
            {t.common.learnMore}
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default RewardItem;
