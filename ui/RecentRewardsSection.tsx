import prisma from "@/lib/prisma";
import RecentRewardsCarousel from "./RecentRewardsCarousel";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function RecentRewardsSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const rewards = await prisma.reward.findMany({
    where: { status: "active" },
    take: 8,
    include: { platform: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container-wrapper">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-concert-one mb-4 uppercase tracking-tight">
            {t.home.recentRewards.split(" ").map((word, i) => (
              <span key={i} className={i % 2 === 1 ? "text-primary" : ""}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </div>

        <RecentRewardsCarousel rewards={rewards} locale={locale} />
      </div>
    </section>
  );
}
