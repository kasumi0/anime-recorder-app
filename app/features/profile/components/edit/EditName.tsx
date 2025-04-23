"use client";

import { useState } from "react";
import { updateUserName } from "@/app/lib/actions/updateUserName";
import { useUserStore } from "@/app/store/userStore";


type Props = {
  currentName: string;
  userId: string;
};

const EditName = ({ currentName, userId }: Props) => {
  const [name, setName] = useState(currentName);
  const [message, setMessage] = useState("");
  const setGlobalName = useUserStore((state) => state.setName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateUserName(userId, name);
    // クリックイベントなのでuseEffectは使わないでいい。
    // レンダリングでの発動などはuseEffectで囲まないといけない。
    if (!result.error) {
      setGlobalName(name);
      setMessage("名前を更新しました");
      // toastを使う→変更処理必要
    } else {
      setMessage(result.error);
      // toastを使ってエラーの通知を表示させる。
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
      />
      <button type="submit">保存</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EditName;
