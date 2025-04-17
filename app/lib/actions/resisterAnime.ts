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


  if (userId) {
    return await prisma.$transaction([
      prisma.userAnime.create({
        data: {
          user: {
            connect: {id: userId}
          },
          anime: {
            connectOrCreate: {
              where: {id},
              create: {
                id,
                title,
                imageUrl,
                seasonYear,
                seasonName,
              },
            },
          },
        },
      }),
      prisma.status.create({
        data: {
          userId,
          animeId: id,
          state: "WANT_TO_WATCH",
        },
      }),
    ]);

  }
};
