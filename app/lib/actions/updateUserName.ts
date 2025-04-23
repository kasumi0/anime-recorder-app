// app/lib/actions/updateUserName.ts
"use server";

import { prisma } from "../prisma";

export const updateUserName = async (userId: string, newName: string) => {
  if (!newName.trim()) {
    return { error: "名前を空にすることはできません。" };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: newName },
    });
    return { success: true };
  } catch (error) {
    console.error("名前の更新に失敗:", error);
    return { error: "更新中にエラーが発生しました。" };
  }
};
