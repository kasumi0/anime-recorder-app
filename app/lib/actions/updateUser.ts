"use server";

import { ProfileResult } from "@/app/types/types";
import { prisma } from "../prisma";
import { updateCustomIcon } from "./updateCustomIcon";

export const updateUser = async (
  _: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> => {
  try {
    const userId = formData.get("userId") as string;
    const newIcon = formData.get("imageUrl") as string;
    const newName = formData.get("userName") as string;

    if (!newName.trim()) {
      return {
        success: false,
        message: "名前を空にすることはできません。",
        newData: { newName: "", newIcon: null },
      };
    }
    await prisma.user.update({
      where: { id: userId },
      data: { name: newName },
    });

    if (newIcon) {
      const imageUpdateResult = await updateCustomIcon(userId, newIcon);
      if (!imageUpdateResult.success) {
        throw new Error("Failed to update custom icon");
      }
    }
    
    return {
      success: true,
      message: "プロフィール情報を更新しました",
      newData: { newIcon, newName },
    };
  } catch (error) {
    console.error("プロフィールの変更に失敗しました:", error);
    return {
      success: false,
      message: "更新中にエラーが発生しました。",
      newData: { newName: "", newIcon: null },
    };
  }
};
