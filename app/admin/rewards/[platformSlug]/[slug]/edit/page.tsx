import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import RewardEditorPage from "@/components/admin/RewardEditorPage";
import { notFound } from "next/navigation";
import { dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditRewardPageProps {
  params: Promise<{
    platformSlug: string;
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditRewardPage({ params }: EditRewardPageProps) {
  const { platformSlug, slug } = await params;
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const ADMIN_PASSWORD = serverEnv.ADMIN_PASSWORD;

  if (auth !== ADMIN_PASSWORD) {
    return <AdminLoginForm />;
  }

  const reward = await prisma.reward.findFirst({
    where: { 
      slug,
      platform: { slug: platformSlug }
    },
    include: { platform: true, contents: { orderBy: { order: "asc" } } },
  });

  if (!reward || reward.platform.slug !== platformSlug) {
    return notFound();
  }

  const platforms = await prisma.platform.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto py-6 px-4 h-screen flex flex-col">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin" prefetch={false}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Edit Reward: <span className="text-primary">{reward.title}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Platform: {reward.platform.name} • Slug: {reward.slug}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <RewardEditorPage
          platforms={platforms}
          reward={reward}
          initialContents={reward.contents}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
}
