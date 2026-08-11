"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

async function checkAuth() {
  return isAdminAuthenticated();
}

export async function getPlatformActiveRewards(platformId: string) {
  if (!(await checkAuth())) throw new Error("Unauthorized");

  const rewards = await prisma.reward.findMany({
    where: {
      platformId,
      status: "active",
    },
    select: {
      id: true,
      title: true,
      image: true,
      previewImage: true,
      description: true,
      template: true,
      claimUrl: true,
      contents: {
        orderBy: { order: "asc" },
        select: { type: true, value: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rewards.map((r) => {
    const codeBlock = r.contents.find((c) => c.type === "code");
    return {
      id: r.id,
      name: r.title,
      image: r.previewImage || r.image || null,
      description: r.description,
      template: r.template,
      claimUrl: r.claimUrl,
      redemptionCode: codeBlock?.value || null,
    };
  });
}

export async function postToPinterest(
  base64Image: string,
  text: string,
  platformName: string = "NFR",
) {
  if (!(await checkAuth())) throw new Error("Unauthorized");

  const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
  if (!accessToken) throw new Error("Pinterest integration is not configured");

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  const apiBaseUrl =
    process.env.PINTEREST_API_ENV === "sandbox"
      ? "https://api-sandbox.pinterest.com/v5"
      : "https://api.pinterest.com/v5";

  let boardId = "";
  const targetBoardName = `${platformName} Rewards`;

  try {
    const boardsResponse = await fetch(`${apiBaseUrl}/boards`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const boardsData = await boardsResponse.json();
    if (!boardsResponse.ok) {
      throw new Error(boardsData.message || "Failed to fetch Pinterest boards");
    }

    if (boardsData.items && boardsData.items.length > 0) {
      const existingBoard = boardsData.items.find(
        (b: any) => b.name.toLowerCase() === targetBoardName.toLowerCase(),
      );
      if (existingBoard) {
        boardId = existingBoard.id;
      }
    }

    if (!boardId) {
      // Auto-create a board if one does not exist
      const createBoardResponse = await fetch(`${apiBaseUrl}/boards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: targetBoardName,
          description: `Free in-game rewards & promo codes for ${platformName}`,
        }),
      });
      const createBoardData = await createBoardResponse.json();
      if (!createBoardResponse.ok) {
        throw new Error(
          `Failed to auto-create Pinterest board: ${createBoardData.message}`,
        );
      }
      boardId = createBoardData.id;
    }
  } catch (err: any) {
    throw new Error(`Pinterest Board Error: ${err.message}`);
  }

  try {
    const pinResponse = await fetch(`${apiBaseUrl}/pins`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: boardId,
        title: "New Free Rewards",
        description: text.slice(0, 499), // Pinterest description limit
        media_source: {
          source_type: "image_base64",
          content_type: "image/png",
          data: base64Data,
        },
      }),
    });

    const pinData = await pinResponse.json();
    if (!pinResponse.ok) {
      throw new Error(pinData.message || "Failed to create Pin");
    }

    return { success: true, message: "Successfully posted to Pinterest!" };
  } catch (err: any) {
    throw new Error(`Pinterest Upload Error: ${err.message}`);
  }
}
