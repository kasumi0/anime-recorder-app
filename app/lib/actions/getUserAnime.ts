"use server";
import { prisma } from "@/app/lib/prisma";

export const getUserAnimeData = async (animeId: number, userId: string) => {
  const anime = await prisma.anime.findUnique({
    where: { id: animeId },
    include: {
      statuses: { where: { userId } },
      reviews: { where: { userId } },
    },
  });

  if (!anime) return null;

  return {
    id: anime.id,
    title: anime.title,
    imageUrl: anime.imageUrl,
    status: anime.statuses[0]?.state ?? "",
    rating: anime.reviews[0]?.rating ?? 0,
    comment: anime.reviews[0]?.comment ?? "",
  };
};