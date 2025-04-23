"use client";

import { IoSearch } from "react-icons/io5";
import styles from "../top.module.css";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
const { searchArea, iconBox } = styles;

export const Search = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const query = new FormData(e.currentTarget).get('query')
    startTransition(() => {
      router.push(`?query=${query}`);
    })
  }

  return (
    <form onSubmit={handleSubmit} className={searchArea}>
      <label>
        <span className={iconBox}>
          <IoSearch />
        </span>
        <input type="text" name="query" placeholder="キーワードで検索..." />
        {isPending && <PulseLoader color="#91bbb7" size={6} />}
      </label>
    </form>
  );
};
