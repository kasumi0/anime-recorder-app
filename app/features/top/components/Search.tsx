"use client";

import { IoSearch } from "react-icons/io5";
import styles from "../top.module.css";
import { Dispatch, SetStateAction, useTransition } from "react";
import { PulseLoader } from "react-spinners";
const { searchArea, iconBox } = styles;
type Props = {
  setQuery: Dispatch<SetStateAction<string | null>>;
};

export const Search = ({ setQuery }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget.query as HTMLInputElement).value;
    startTransition(() => setQuery(query));
  };

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
