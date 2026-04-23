import { cookies } from "next/headers";
import serverEnv from "@/utils/serverEnv";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;

  return auth === serverEnv.ADMIN_PASSWORD;
}
