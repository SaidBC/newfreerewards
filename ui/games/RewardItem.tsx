import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";

interface RewardItemProps {
  src?: string;
  title: string;
  platform: { name: string };
  slug: string;
  locale: Locale;
}

const RewardItem = ({ src, title, platform, slug, locale }: RewardItemProps) => {
  const t = getDictionary(locale);

  return (
    <li>
      <Image
        className="rounded-md object-cover h-32 w-32"
        src={src || "/chest-image.png"}
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
          <Link href={localizePath(locale, "/games/clash-royale/rewards/" + slug)}>
            {t.common.learnMore}
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default RewardItem;
