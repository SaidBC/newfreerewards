import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import serverEnv from "@/utils/serverEnv";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    console.log("API Login attempt. Received:", password, "Expected:", serverEnv.ADMIN_PASSWORD);
    
    if (password === serverEnv.ADMIN_PASSWORD) {
      const res = NextResponse.json({ success: true });
      
      res.cookies.set("admin_auth", password, {
        httpOnly: true,
        secure: false, // explicitly false
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return res;
    }

    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
