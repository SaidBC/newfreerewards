import { cookies } from "next/headers";
import serverEnv from "@/utils/serverEnv";

export const dynamic = "force-dynamic";

export default async function AdminDebugPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const auth = cookieStore.get("admin_auth")?.value;
  
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Admin Debug</h1>
      <div>
        <h2 className="text-xl font-bold">Environment Variables</h2>
        <pre className="bg-muted p-4 rounded-md">
          {JSON.stringify({
            NODE_ENV: process.env.NODE_ENV,
            NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
            ADMIN_PASSWORD: serverEnv.ADMIN_PASSWORD,
            secureFlag: process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_URL?.includes("localhost")
          }, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="text-xl font-bold">Cookies</h2>
        <pre className="bg-muted p-4 rounded-md">
          {JSON.stringify(allCookies, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="text-xl font-bold">Auth Check</h2>
        <pre className="bg-muted p-4 rounded-md">
          {JSON.stringify({
            authCookieValue: auth,
            isMatch: auth === serverEnv.ADMIN_PASSWORD
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
