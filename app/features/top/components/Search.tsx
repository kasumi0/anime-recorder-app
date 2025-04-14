"use client";

import { IoSearch } from "react-icons/io5";
import styles from "../top.module.css";
const { searchArea, iconBox } = styles;

export const Search = () => {
  return (
    <form method="GET" className={searchArea}>
      <label>
        <span className={iconBox}>
          <IoSearch />
        </span>
        <input type="text" name="query" placeholder="キーワードで検索..." />
      </label>
    </form>
  );
};
