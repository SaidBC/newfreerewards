import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface RewardItemProps {
  src: string;
  title: string;
  platform: { name: string };
  slug: string;
}

const RewardItem = ({ src, title, platform, slug }: RewardItemProps) => {
  return (
    <li>
      <Image
        className="rounded-md object-cover h-32 w-32"
        src={src}
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
          <Link href={"/games/clash-royale/rewards/" + slug}>Learn More</Link>
        </Button>
      </div>
    </li>
  );
};

export default RewardItem;
