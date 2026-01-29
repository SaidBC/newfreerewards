"use client";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import { Platform, Reward } from "@prisma/client";

interface RecentRewardsCarousel {
  rewards: (Reward & { platform: Platform })[];
}

export default function RecentRewardsCarousel({
  rewards,
}: RecentRewardsCarousel) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
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
          <CarouselItem key={reward.id} className="basis-1/2 md:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                  <img
                    src={reward.previewImage || "/chest-image.png"}
                    alt={reward.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
                  />
                  <span className="text-base sm:text-lg font-semibold text-center">
                    {reward.title}
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {reward.platform.name}
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
  );
}
