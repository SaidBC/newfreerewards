import siteConfig from "@/lib/siteConfig";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    rewardId: string;
  }>;
};

function getRewardById(rewardId: string) {
  const rewards = siteConfig.clashroyale.rewards;
  const reward = rewards.find((reward) => reward.id === rewardId);
  return reward;
}
function renderBlock(block: any, index: number) {
  switch (block.type) {
    case "text":
      return (
        <p key={index} className="text-muted-foreground">
          {block.value}
        </p>
      );

    case "image":
      return (
        <Image
          key={index}
          className="rounded-lg"
          src={block.src}
          alt={block.alt}
          width={400}
          height={400}
        />
      );

    case "link":
      return (
        <p key={index} className="font-bold">
          <a
            href={block.href}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {block.label}
          </a>
        </p>
      );

    default:
      return null;
  }
}

export default async function Page({ params }: PageProps) {
  const reward = getRewardById((await params).rewardId);
  console.log(reward);
  if (!reward) return notFound();
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-md object-cover size-12"
            src={reward.platform.src}
            width={48}
            height={48}
            alt={reward.platform.name}
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-concert-one">
              Free {reward.platform.name} Rewards
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              {reward.name}
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-muted-foreground text-lg">
          {reward.description}
        </p>
      </section>

      {/* Blog-like Content */}
      <section className="mx-auto max-w-5xl px-4 pb-24 flex flex-col gap-6">
        {reward.content.map(renderBlock)}
      </section>
    </main>
  );
}
