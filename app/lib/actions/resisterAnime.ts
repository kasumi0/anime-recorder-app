"use server";

import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { RegisterType } from "@/app/types/types";

export const registerAnime = async ({
  id,
  title,
  seasonYear,
  seasonName,
  imageUrl,
}: RegisterType) => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  await prisma.anime.upsert({
    where: { id },
    update: {}, // 更新は不要（あっても上書きされない）
    create: { id, title, seasonYear, seasonName, imageUrl },
  });

  if (userId) {
    return await prisma.userAnime.create({
      data: { userId, animeId: id },
    });
  }
};
