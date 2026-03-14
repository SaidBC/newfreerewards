"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import serverEnv from "@/utils/serverEnv";

const ADMIN_PASSWORD = serverEnv.ADMIN_PASSWORD;

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  return auth === ADMIN_PASSWORD;
}

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_URL?.includes("localhost"),
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    
    // Invalidate the absolute root layout cache so the new cookie is read
    revalidatePath("/", "layout");
    
    // Return success to the client
    return { success: true, error: null };
  }
  return { success: false, error: "Invalid password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  redirect("/admin");
}

export async function createReward(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const platformId = parseInt(formData.get("platformId") as string);
  const claimUrl = (formData.get("claimUrl") as string) || null;
  const image = (formData.get("image") as string) || null;
  const expiresAt = formData.get("expiresAt") ? new Date(formData.get("expiresAt") as string) : null;
  const previewImage = (formData.get("previewImage") as string) || null;

  const data: Prisma.RewardUncheckedCreateInput = {
    title,
    description,
    slug,
    platformId,
    claimUrl,
    image,
    expiresAt,
    previewImage,
  };
  const reward = await prisma.reward.create({
    data,
    include: { platform: true },
  });

  if (reward.platform) {
    revalidatePath(`/games/${reward.platform.slug}`);
  }
  revalidatePath("/", "layout");
}

export async function updateReward(id: number, formData: FormData) {
  if (!(await checkAuth())) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const platformId = parseInt(formData.get("platformId") as string);
  const claimUrl = (formData.get("claimUrl") as string) || null;
  const image = (formData.get("image") as string) || null;
  const expiresAt = formData.get("expiresAt") ? new Date(formData.get("expiresAt") as string) : null;
  const previewImage = (formData.get("previewImage") as string) || null;
  const status = formData.get("status") as any;

  const data: Prisma.RewardUncheckedUpdateInput = {
    title,
    description,
    slug,
    platformId,
    claimUrl,
    image,
    expiresAt,
    previewImage,
    status,
  };

  const reward = await prisma.reward.update({
    where: { id },
    data,
    include: { platform: true },
  });

  if (reward.platform) {
    revalidatePath(`/games/${reward.platform.slug}`);
  }
  revalidatePath("/", "layout");
}

export async function deleteReward(id: number) {
  if (!(await checkAuth())) throw new Error("Unauthorized");

  const reward = await prisma.reward.delete({
    where: { id },
    include: { platform: true },
  });

  if (reward.platform) {
    revalidatePath(`/games/${reward.platform.slug}`);
  }
  revalidatePath("/", "layout");
}
