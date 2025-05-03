"use client";

import { deleteUser } from "@/app/lib/actions/deleteUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const DeleteUserButton = () => {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmDelete = window.confirm("本当にアカウントを削除しますか？");
    if (!confirmDelete) return;

    const result = await deleteUser();

    if (result.success) {
      toast.success("アカウントを削除しました");
      router.push("/");
    } else {
      toast.error(result.error || "削除に失敗しました");
    }
  };

  return (
    <button onClick={handleDelete} type="button">
      アカウントを削除
    </button>
  );
};
