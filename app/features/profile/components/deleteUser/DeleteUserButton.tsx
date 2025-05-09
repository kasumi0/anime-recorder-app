"use client";

import { deleteUser } from "@/app/lib/actions/deleteUser";
import { signOut } from "next-auth/react";
import { startTransition } from "react";
import toast from "react-hot-toast";

export const DeleteUserButton = () => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("本当にアカウントを削除しますか？");
    if (!confirmDelete) return;


    startTransition(async()=> {
      const result = await deleteUser();
      if (result.success) {
        signOut({ callbackUrl: '/' });
      } else {
        toast.error(result.error || "削除に失敗しました");
      }

    })
  };

  return (
    <button onClick={handleDelete} type="button">
      アカウントを削除
    </button>
  );
};
