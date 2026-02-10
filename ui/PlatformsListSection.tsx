import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { Platform } from "@prisma/client";
import Link from "next/link";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";

const PlatformCard = ({
  platform,
  locale,
  exploreLabel,
}: {
  platform: Platform;
  locale: Locale;
  exploreLabel: string;
}) => (
  <li>
    <Link
      href={localizePath(locale, `/${platform.type.toLowerCase()}s/${platform.slug}`)}
      className="flex flex-row items-center gap-2 border py-1 pl-1 pr-4 rounded-lg h-full hover:border-primary transition-colors"
    >
      <Image
        className="rounded-md object-cover h-32 w-32"
        src={`/${platform.slug}.jpg`}
        width={125}
        height={125}
        alt={platform.name}
      />
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-bold font-concert-one">{platform.name}</h2>
          <p className="text-muted-foreground text-xs">
            Last time updated :{platform.createdAt?.toDateString()}
          </p>
        </div>
        <Button size={"sm"} className="text-xs w-fit">
          {exploreLabel}
        </Button>
      </div>
    </Link>
  </li>
);

export default async function PlatformsListSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const gamePlatforms = await prisma.platform.findMany({
    where: {
      type: "GAME",
    },
  });

  const moneyPlatforms = await prisma.platform.findMany({
    where: {
      type: "SERVICE",
    },
  });

  return (
    <section id="list" className="py-12">
      <h1 className="text-2xl font-bold font-concert-one text-green-400 mb-4">
        {t.home.allPlatforms}
      </h1>
      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="games">{t.home.gamesTab}</TabsTrigger>
          <TabsTrigger value="money">{t.home.moneyTab}</TabsTrigger>
        </TabsList>
        <TabsContent value="games">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {gamePlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                locale={locale}
                exploreLabel={t.home.exploreMore}
              />
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="money">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {moneyPlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                locale={locale}
                exploreLabel={t.home.exploreMore}
              />
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </section>
  );
}
