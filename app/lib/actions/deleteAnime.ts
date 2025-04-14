"use server";

import { prisma } from "@/app/lib/prisma";

export const deleteAnime = async (id : string ) => {
  return await prisma.userAnime.delete({
    where: { id },
  });
};
