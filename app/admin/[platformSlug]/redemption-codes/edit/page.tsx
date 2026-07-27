import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RedemptionCodesForm } from "@/components/admin/RedemptionCodesForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function EditRedemptionCodesPage({
  params,
}: {
  params: Promise<{ platformSlug: string }>;
}) {
  const { platformSlug } = await params;

  const platform = await prisma.platform.findUnique({
    where: { slug: platformSlug },
    include: {
      rewards: {
        where: { slug: "redemption-codes" },
        include: {
          contents: { where: { type: "code" }, orderBy: { order: "asc" } },
        },
      },
    },
  });
  if (!platform) return notFound();

  const reward = platform.rewards[0];
  const initialCodes = reward
    ? reward.contents.map((c) => ({
        value: c.value || "",
        label: c.label || "",
      }))
    : [];

  return (
    <div className="space-y-6">
      <Button variant="link" asChild className="pl-0">
        <Link href="/admin" prefetch={false}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
      </Button>
      <RedemptionCodesForm platform={platform} initialCodes={initialCodes} />
    </div>
  );
}
