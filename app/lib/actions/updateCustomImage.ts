"use server";

import { prisma } from "@/app/lib/prisma";

export const updateCustomImage = async (
  userId: string,
  animeId: number,
  imageUrl: string
): Promise<{ success: boolean }> => {
  try {
    await prisma.userAnime.update({
      where: {
        userId_animeId: { userId, animeId },
      },
      data: {
        imageUrl,
      },
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
