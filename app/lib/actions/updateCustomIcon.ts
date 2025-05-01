"use server";

import { prisma } from "@/app/lib/prisma";

export const updateCustomIcon = async (
  userId: string,
  newIcon: string
): Promise<{ success: boolean }> => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { image: newIcon },
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
