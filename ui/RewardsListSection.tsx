import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { Reward, Platform } from "@prisma/client";
import Link from "next/link";

type RewardWithPlatform = Reward & { platform: Platform };

const RewardCard = ({ reward }: { reward: RewardWithPlatform }) => (
  <li>
    <Link
      href={`/${reward.platform.type.toLowerCase()}s/${reward.platform.slug}`}
      className="flex flex-row items-center gap-2 border py-1 pl-1 pr-4 rounded-lg h-full hover:border-primary transition-colors"
    >
      <Image
        className="rounded-md object-cover h-32 w-32"
        src={`/${reward.platform.slug}.jpg`} // Assuming you have images named like 'clash-royale.jpg' in /public
        width={125}
        height={125}
        alt={reward.platform.name}
      />
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-bold font-concert-one">{reward.platform.name}</h2>
          <p className="text-muted-foreground text-xs">{reward.title}</p>
        </div>
        <Button size={"sm"} className="text-xs w-fit">
          Explore
        </Button>
      </div>
    </Link>
  </li>
);

export default async function RewardsListSection() {
  const gameRewards = await prisma.reward.findMany({
    where: { platform: { type: "GAME" } },
    include: { platform: true },
    orderBy: { createdAt: "desc" },
  });

  const moneyRewards = await prisma.reward.findMany({
    where: { platform: { type: "SERVICE" } },
    include: { platform: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-12">
      <h1 className="text-2xl font-bold font-concert-one text-green-400 mb-4">
        All Rewards
      </h1>
      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="money">Money</TabsTrigger>
        </TabsList>
        <TabsContent value="games">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {gameRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="money">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {moneyRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </section>
  );
}
