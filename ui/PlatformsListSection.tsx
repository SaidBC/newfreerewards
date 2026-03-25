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
  <li className="group h-full">
    <Link
      href={localizePath(locale, `/${platform.type.toLowerCase()}s/${platform.slug}`)}
      className="flex flex-col gap-4 border p-4 rounded-2xl h-full bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:bg-card transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
        <Image
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={platform.image || "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/clash-royale.jpg"}
          fill
          alt={platform.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
           <span className="text-white text-sm font-concert-one uppercase tracking-wider">{exploreLabel}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold font-concert-one text-xl uppercase tracking-tight">{platform.name}</h2>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0" />
        </div>
        <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">
          Last update: {platform.createdAt?.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <Button size="sm" className="w-full font-concert-one uppercase tracking-wider py-5">
        {exploreLabel}
      </Button>
    </Link>
  </li>
);

export default async function PlatformsListSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const gamePlatforms = await prisma.platform.findMany({
    where: { type: "GAME" },
    orderBy: { createdAt: 'desc' },
  });

  const moneyPlatforms = await prisma.platform.findMany({
    where: { type: "SERVICE" },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section id="list" className="py-24 container-wrapper">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-concert-one mb-4 uppercase tracking-tight">
          {t.home.allPlatforms.split(' ').map((word, i) => (
             <span key={i} className={i === 0 ? 'text-primary' : ''}>{word} </span>
          ))}
        </h2>
        <div className="h-1.5 w-24 bg-primary rounded-full mb-6" />
        <p className="max-w-xl text-muted-foreground">
          Find and claim the latest rewards, gifts, and promotions from your favorite games and services.
        </p>
      </div>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-14 p-1 bg-muted/50 rounded-xl mb-10">
          <TabsTrigger value="games" className="rounded-lg text-base font-concert-one uppercase transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
            {t.home.gamesTab}
          </TabsTrigger>
          <TabsTrigger value="money" className="rounded-lg text-base font-concert-one uppercase transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
            {t.home.moneyTab}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="games" className="mt-0 focus-visible:outline-none">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <TabsContent value="money" className="mt-0 focus-visible:outline-none">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
