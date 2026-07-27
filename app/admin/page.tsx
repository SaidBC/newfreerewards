import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { logout } from "./actions";
import serverEnv from "@/utils/serverEnv";
import Image from "next/image";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { RewardList } from "@/components/admin/RewardList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Upload, Scan } from "lucide-react";
import { RecentActivity } from "@/components/admin/RecentActivity";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const ADMIN_PASSWORD = serverEnv.ADMIN_PASSWORD;

  console.log("AdminPage Render:", { auth, ADMIN_PASSWORD });

  if (auth !== ADMIN_PASSWORD) {
    return <AdminLoginForm />;
  }

  const platforms = await prisma.platform.findMany({
    orderBy: { name: "asc" },
  });

  const rawRewards = await prisma.reward.findMany({
    include: {
      platform: true,
      contents: true,
      reactions: true,
      reports: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const recentReactions = await prisma.rewardReaction.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { reward: { include: { platform: true } } },
  });

  const recentReports = await prisma.rewardReport.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { reward: { include: { platform: true } } },
  });

  // Group rewards by platform
  const groupedRewards = platforms
    .map((platform) => ({
      ...platform,
      rewards: rawRewards.filter((r) => r.platformId === platform.id),
    }))
    .filter((group) => group.rewards.length > 0 || true);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center sm:items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage rewards across all gaming platforms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/scan-results" prefetch={false}>
              <Scan className="w-4 h-4 mr-2" />
              Scan Results
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/upload" prefetch={false}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/rewards/new" prefetch={false}>
              <Plus className="w-4 h-4 mr-2" />
              Create Reward
            </Link>
          </Button>
          <form action={logout}>
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          {groupedRewards.map((group) => (
            <section key={group.id} className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-2">
                {group.image && (
                  <Image
                    src={group.image}
                    alt={group.name}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded object-cover"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {group.name}
                </h3>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground font-mono">
                  {group.rewards.length}
                </span>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="ml-auto h-7 text-xs"
                >
                  <Link
                    href={`/admin/${group.slug}/redemption-codes/edit`}
                    prefetch={false}
                  >
                    Manage Redemption Codes
                  </Link>
                </Button>
              </div>
              <RewardList rewards={group.rewards} platforms={platforms} />
            </section>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <RecentActivity
              reactions={recentReactions}
              reports={recentReports}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
