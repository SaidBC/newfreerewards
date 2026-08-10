import { prisma } from "@/lib/prisma";
import SocialStudioClient from "./SocialStudioClient";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  const platforms = await prisma.platform.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Media Studio</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          Generate graphics and post directly to social media platforms.
        </p>
      </div>

      <SocialStudioClient platforms={platforms} />
    </div>
  );
}
