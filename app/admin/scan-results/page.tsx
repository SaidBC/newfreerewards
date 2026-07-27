import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import serverEnv from "@/utils/serverEnv";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { ScanResultsList } from "./ScanResultsList";

export const dynamic = "force-dynamic";

export default async function ScanResultsPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;

  if (auth !== serverEnv.ADMIN_PASSWORD) {
    return <AdminLoginForm />;
  }

  const results = await prisma.scanResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const total = await prisma.scanResult.count();

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-8 px-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Scan Results
        </h2>
        <p className="text-muted-foreground mt-1">
          Results from automation scans ({total} total)
        </p>
      </div>

      <ScanResultsList results={results} />
    </div>
  );
}
