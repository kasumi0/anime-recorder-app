"use client";

import { registerAnime } from "@/app/lib/actions/resisterAnime";
import { useState, useTransition } from "react";
import { RegisterType } from "@/app/types/types";
import toast from "react-hot-toast";
import styles from "../top.module.css";
const { registerButton, isRegisteredLabel } = styles;

export const Register = (props: RegisterType) => {
  const [isPending, startTransition] = useTransition();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    startTransition(async () => {
      const promise = registerAnime(props);
      toast.promise(promise, {
        loading: "登録中...",
        success: "My Pageに登録しました！",
        error: "登録に失敗しました",
      });

      const result = await promise;
      if (result) {
        setIsRegistered(true);
      }
    });
  };

  if (isRegistered) {
    return <p className={isRegisteredLabel}>登録済み</p>;
  }

  return (
    <button className={registerButton} type="button" onClick={handleRegister} disabled={isPending}>
      {isPending ? "登録中..." : "My Pageに登録"}
    </button>
  );
};
