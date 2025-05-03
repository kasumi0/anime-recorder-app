
// app/lib/actions/deleteUser.ts
"use server";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../next-auth/options";
import { prisma } from "../prisma";

export const deleteUser = async () => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "ログイン情報が確認できません。" };
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true };
  } catch (error) {
    console.error("ユーザー削除エラー:", error);
    return { error: "ユーザー削除に失敗しました。" };
  }
};
