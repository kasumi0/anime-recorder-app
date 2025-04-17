"use server";

import { prisma } from "@/app/lib/prisma";

export const deleteAnime = async (userId: string, animeId: number) => {
  return await prisma.$transaction([
    prisma.review.deleteMany({
      where: { userId, animeId },
    }),
    prisma.status.deleteMany({
      where: { userId, animeId },
    }),
    prisma.userAnime.delete({
      where: {
        userId_animeId: { userId, animeId },
      },
    }),
  ]);
};
