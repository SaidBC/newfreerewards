import prisma from "@/lib/prisma";
import RecentRewardsCarousel from "./RecentRewardsCarousel";

export async function RecentRewardsSection() {
  const rewards = await prisma.reward.findMany({
    where: {
      status: "active",
    },
    take: 5,
    include: {
      platform: true,
    },
  });
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold font-concert-one text-amber-400 tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Recent Rewards
        </h2>
        <RecentRewardsCarousel rewards={rewards} />
      </div>
    </section>
  );
}
