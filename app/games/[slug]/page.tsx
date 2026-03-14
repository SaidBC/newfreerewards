import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { defaultLocale, localizePath } from "@/lib/i18n";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const platforms = await prisma.platform.findMany({
    select: { slug: true },
  });
  return platforms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
  });

  if (!platform) return {};

  return {
    title: `${platform.name} Free Rewards & Bonuses`,
    description: `Discover active free rewards, bonuses, and promotions available for ${platform.name}.`,
    alternates: {
      canonical: `/games/${platform.slug}`,
    },
    openGraph: {
      title: `${platform.name} – Free Rewards`,
      description: `Claim free rewards and bonuses available on ${platform.name}.`,
      url: `/games/${platform.slug}`,
      type: "website",
    },
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    include: {
      rewards: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!platform) notFound();

  const now = new Date();
  const activeRewards = platform.rewards.filter(r => 
    r.status === "active" && (!r.expiresAt || new Date(r.expiresAt) > now)
  );
  const expiredRewards = platform.rewards.filter(r => 
    r.status === "expired" || (r.expiresAt && new Date(r.expiresAt) <= now)
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Hero / Intro */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex gap-4 items-center">
          {platform.image && (
            <Image
              className="rounded-md object-cover size-12"
              src={platform.image}
              width={125}
              height={125}
              alt={platform.name}
            />
          )}
          <h1 className="mb-4 text-4xl md:text-5xl font-concert-one">
            Free {platform.name} Rewards
          </h1>
        </div>

        <p className="max-w-3xl text-muted-foreground text-lg">
          Discover all currently available free {platform.name} rewards in one
          place. We track free chests, emotes, events, and limited-time bonuses
          so you never miss a reward.
        </p>
      </section>

      {/* Active Rewards */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="mb-6 text-2xl font-concert-one">Active Rewards</h2>
        {activeRewards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No active rewards available at the moment.</p>
        )}
      </section>

      {/* Expired Rewards */}
      {expiredRewards.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-24 opacity-60">
          <h2 className="mb-6 text-2xl font-concert-one">Recently Expired</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expiredRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </section>
      )}

      {/* SEO Content Footer */}
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-2xl font-semibold">{platform.name} Rewards Information</h2>
          <p className="mt-2 text-muted-foreground">
            We track verified active rewards, events, and official links from trusted sources for {platform.name}.
            Make sure to check back frequently as new rewards are added regularly.
          </p>
        </section>
        <p className="mt-4 text-sm font-bold text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </main>
  );
}

function RewardCard({ reward }: { reward: any }) {
  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {reward.previewImage && (
        <div className="relative h-48 w-full">
          <Image
            src={reward.previewImage}
            alt={reward.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold">{reward.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{reward.description}</p>
        
        {reward.claimUrl && (
          <a
            href={reward.claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition-colors"
          >
            Claim Reward
          </a>
        )}
      </div>
    </div>
  );
}
