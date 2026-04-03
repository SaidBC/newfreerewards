import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { RewardForm } from "@/components/admin/RewardForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewRewardPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const ADMIN_PASSWORD = serverEnv.ADMIN_PASSWORD;

  if (auth !== ADMIN_PASSWORD) {
    return <AdminLoginForm />;
  }

  const platforms = await prisma.platform.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create New Reward</h2>
          <p className="text-muted-foreground mt-1">Fill in the details to add a new reward to the platform.</p>
        </div>
      </div>

      <RewardForm platforms={platforms} />
    </div>
  );
}
