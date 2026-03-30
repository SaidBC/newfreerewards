import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { logout } from "./actions";
import serverEnv from "@/utils/serverEnv";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { RewardForm } from "@/components/admin/RewardForm";
import { RewardList } from "@/components/admin/RewardList";
import { Button } from "@/components/ui/button";

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

  const rewards = await prisma.reward.findMany({
    include: { platform: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Rewards Management</h2>
          <p className="text-muted-foreground mt-1">Manage and update active and expired rewards.</p>
        </div>
        <form action={logout}>
          <Button variant="destructive" type="submit">Logout</Button>
        </form>
      </div>

      <div className="grid gap-8 grid-cols-1">
        {/* Add New Reward Form */}
        <section>
          <RewardForm platforms={platforms} />
        </section>

        {/* Rewards List */}
        <section>
          <RewardList rewards={rewards} platforms={platforms} />
        </section>
      </div>
    </div>
  );
}
