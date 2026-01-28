import CurrentActiveRewardsSection from "@/ui/games/CurrentActiveRewardsSection";
import RewardItem from "@/ui/games/RewardItem";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero / Intro */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={"/clash-royale.jpg"}
            width={125}
            height={125}
            alt={"Clash Royale"}
          />
          <h1 className="mb-4 text-4xl md:text-5xl font-concert-one">
            Free Clash Royale Rewards
          </h1>
        </div>

        <p className="max-w-3xl text-muted-foreground text-lg">
          Discover all currently available free Clash Royale rewards in one
          place. We track free chests, emotes, events, and limited-time bonuses
          so you never miss a reward.
        </p>
      </section>

      {/* Current Active Rewards */}
      <CurrentActiveRewardsSection />
    </main>
  );
}
