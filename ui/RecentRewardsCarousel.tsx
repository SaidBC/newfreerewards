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
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import Link from "next/link";

interface RecentRewardsCarousel {
  rewards: (Reward & { platform: Platform })[];
  locale: Locale;
}

export default function RecentRewardsCarousel({
  rewards,
  locale
}: RecentRewardsCarousel) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const t = getDictionary(locale);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-5xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-4">
        {rewards.map((reward) => (
          <CarouselItem key={reward.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <Link href={localizePath(locale, `/${reward.platform.type.toLowerCase()}s/${reward.platform.slug}/rewards/${reward.slug}`)} className="block group">
              <Card className="border rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    <img
                      src={reward.previewImage || "https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/clash-royale/chest-image.png"}
                      alt={reward.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                       <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">New</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <p className="text-[10px] uppercase font-bold text-primary tracking-widest">{reward.platform.name}</p>
                    <h3 className="text-sm font-concert-one uppercase truncate tracking-tight">{reward.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:flex justify-center gap-4 mt-8">
        <CarouselPrevious className="relative static translate-y-0" />
        <CarouselNext className="relative static translate-y-0" />
      </div>
    </Carousel>
  );
}
