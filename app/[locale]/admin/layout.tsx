import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  // Simple path check to allow login page access
  // But since we are using a single page for simplicity or a separate login check, 
  // let's handle it in the page component or middleware.
  // For now, let's just provide the layout.

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <a href={`/${locale}`} className="text-sm text-blue-600 hover:underline">View Site</a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
