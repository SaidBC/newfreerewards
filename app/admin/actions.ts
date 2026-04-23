"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import serverEnv from "@/utils/serverEnv";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const ADMIN_PASSWORD = serverEnv.ADMIN_PASSWORD;

async function checkAuth() {
  return isAdminAuthenticated();
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

export async function saveRedemptionCodes(platformId: number, formData: FormData) {
  if (!(await checkAuth())) throw new Error("Unauthorized");

  const codesMap = JSON.parse(formData.get("codes") as string || "[]");

  const existingReward = await prisma.reward.findUnique({
    where: { platformId_slug: { platformId, slug: "redemption-codes" } },
    include: { platform: true }
  });

  if (existingReward) {
    await prisma.$transaction(async (tx) => {
      // Find highest order of non-code contents to preserve
      const maxOrderContent = await tx.rewardContent.findFirst({
        where: { rewardId: existingReward.id, type: { not: "code" } },
        orderBy: { order: "desc" }
      });
      let nextOrder = maxOrderContent ? maxOrderContent.order + 1 : 0;

      // Delete old codes
      await tx.rewardContent.deleteMany({
        where: { rewardId: existingReward.id, type: "code" }
      });

      // Add new codes
      const newContents = codesMap.map((code: any) => ({
        type: "code" as any,
        value: code.value,
        label: code.label,
        rewardId: existingReward.id,
        order: nextOrder++
      }));

      if (newContents.length > 0) {
        await tx.rewardContent.createMany({ data: newContents });
      }
    });
    
    if (existingReward.platform) {
      revalidatePath(`/games/${existingReward.platform.slug}`);
      revalidatePath(`/[locale]/games/${existingReward.platform.slug}`, "page");
      revalidatePath(`/[locale]/games/${existingReward.platform.slug}/rewards/redemption-codes`, "page");
      revalidatePath("/", "layout");
    }
  } else {
    // Create new the reward
    const newReward = await prisma.reward.create({
      data: {
        platformId,
        slug: "redemption-codes",
        title: "Active Redemption Codes",
        description: "Latest available codes for this game.",
        status: "active",
        contents: {
          create: codesMap.map((code: any, idx: number) => ({
            type: "code" as any,
            value: code.value,
            label: code.label,
            order: idx,
          }))
        }
      },
      include: { platform: true }
    });
    
    if (newReward.platform) {
      revalidatePath(`/games/${newReward.platform.slug}`);
      revalidatePath(`/[locale]/games/${newReward.platform.slug}`, "page");
      revalidatePath(`/[locale]/games/${newReward.platform.slug}/rewards/redemption-codes`, "page");
      revalidatePath("/", "layout");
    }
  }

  revalidatePath("/", "layout");
}
