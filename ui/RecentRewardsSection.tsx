"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const rewards = [
  {
    id: 1,
    title: "Clash Royale: Free Tower Skin",
    game: "Clash Royale",
    image: "https://placehold.net/400x400.png",
  },
  {
    id: 2,
    title: "Brawl Stars: 100 Free Gems",
    game: "Brawl Stars",
    image: "https://placehold.net/400x400.png",
  },
  {
    id: 3,
    title: "Fortnite: Rare Emote",
    game: "Fortnite",
    image: "https://placehold.net/400x400.png",
  },
  {
    id: 4,
    title: "PUBG Mobile: Weapon Crate",
    game: "PUBG Mobile",
    image: "https://placehold.net/400x400.png",
  },
  {
    id: 5,
    title: "Earn $5 with Survey App",
    game: "Money",
    image: "https://placehold.net/400x400.png",
  },
];

export function RecentRewardsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold font-concert-one text-amber-400 tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Recent Rewards
        </h2>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {rewards.map((reward) => (
              <CarouselItem
                key={reward.id}
                className="basis-1/2 md:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                      <img
                        src={reward.image}
                        alt={reward.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
                      />
                      <span className="text-base sm:text-lg font-semibold text-center">
                        {reward.title}
                      </span>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {reward.game}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
