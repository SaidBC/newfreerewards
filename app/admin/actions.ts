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
  console.log("🚀 ~ login ~ password received:", password, "expected:", ADMIN_PASSWORD);
  
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", password, {
      httpOnly: true,
      secure: false, // Explicitly false for local test
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    console.log("🚀 ~ login ~ cookieStore.set called!");

    
    
    // Invalidate the root layout cache
    revalidatePath("/", "layout");
    
    // Redirecting ensures the Set-Cookie header is properly sent to the browser
    redirect("/en/admin");
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
  
  // Handle translations
  const translations = JSON.parse(formData.get("translations") as string || "{}");
  
  // Handle content blocks
  const contentBlocks = JSON.parse(formData.get("contentBlocks") as string || "[]");

  const reward = await prisma.reward.create({
    data: {
      title,
      description,
      slug,
      platformId,
      claimUrl,
      image,
      expiresAt,
      previewImage,
      translations,
      contents: {
        create: contentBlocks.map((block: any, index: number) => ({
          type: block.type,
          value: block.value,
          href: block.href,
          label: block.label,
          imageSrc: block.imageSrc,
          imageAlt: block.imageAlt,
          translations: block.translations,
          order: index,
        })),
      },
    },
    include: { platform: true },
  });

  if (reward.platform) {
    revalidatePath(`/games/${reward.platform.slug}`);
    revalidatePath(`/[locale]/games/${reward.platform.slug}`, "page");
  }
  revalidatePath("/", "layout");
  redirect("/admin");
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

  // Handle translations
  const translations = JSON.parse(formData.get("translations") as string || "{}");
  
  // Handle content blocks
  const contentBlocks = JSON.parse(formData.get("contentBlocks") as string || "[]");

  const reward = await prisma.$transaction(async (tx) => {
    // Delete existing content
    await tx.rewardContent.deleteMany({ where: { rewardId: id } });

    // Update reward and create new content
    return tx.reward.update({
      where: { id },
      data: {
        title,
        description,
        slug,
        platformId,
        claimUrl,
        image,
        expiresAt,
        previewImage,
        status,
        translations,
        contents: {
          create: contentBlocks.map((block: any, index: number) => ({
            type: block.type,
            value: block.value,
            href: block.href,
            label: block.label,
            imageSrc: block.imageSrc,
            imageAlt: block.imageAlt,
            translations: block.translations,
            order: index,
          })),
        },
      },
      include: { platform: true },
    });
  });

  if (reward.platform) {
    revalidatePath(`/games/${reward.platform.slug}`);
    revalidatePath(`/[locale]/games/${reward.platform.slug}`, "page");
  }
  revalidatePath("/", "layout");
  redirect("/admin");
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
