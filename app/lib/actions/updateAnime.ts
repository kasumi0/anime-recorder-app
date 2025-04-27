"use server";

import { prisma } from "@/app/lib/prisma";
import { FormResult } from "@/app/types/types";
import { WatchState } from "@prisma/client";
import { updateCustomImage } from "./updateCustomImage";

export const updateAnime = async (
  _: FormResult | null,
  formData: FormData
): Promise<FormResult> => {
  try {
    const animeId = Number(formData.get("animeId"));
    const userId = formData.get("userId") as string;
    const state = formData.get("status") as WatchState;
    const rating = Number(formData.get("rating"));
    const comment = formData.get("review") as string;
    const imageUrl = formData.get("imageUrl") as string | null;

    await prisma.status.upsert({
      where: {
        userId_animeId: { userId, animeId },
      },
      update: { state },
      create: { userId, animeId, state },
    });

    await prisma.review.upsert({
      where: {
        userId_animeId: { userId, animeId },
      },
      update: { rating, comment },
      create: { userId, animeId, rating, comment },
    });

    if (imageUrl) {
      const imageUpdateResult = await updateCustomImage(
        userId,
        animeId,
        imageUrl
      );
      if (!imageUpdateResult.success) {
        throw new Error("Failed to update custom image");
      }
    }

    return {
      success: true,
      message: "アニメの情報を更新しました",
      newData: {
        status: state,
        rating,
        comment,
        imageUrl,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "更新に失敗しました",
      newData: {
        status: "WANT_TO_WATCH",
        rating: 0,
        comment: "",
      },
    };
  }
};