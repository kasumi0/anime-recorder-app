"use client";

import { useActionState, useEffect, useState } from "react";
import { animeType } from "@/app/types/types";
import { searchAnime } from "@/app/actions/searchAction";
import { IoSearch } from "react-icons/io5";
import styles from "./search.module.css";
import { Card } from "./Card";
const { searchArea, iconBox, resultList } = styles;

export const Search = () => {
  const initialState = { error: "", works: [] };
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchTitles = async () => {
      const res = await fetch("/api/titles");
      const data = await res.json();
      if (data.titles) {
        setTitles(data.titles);
      }
    };
    fetchTitles();
  }, []);

  const action = async (
    state: { error: string; works?: animeType[] },
    formData: FormData
  ) => {
    const query = formData.get("query") as string | null;
    if (!query || query.trim() === "") {
      return { error: "タイトルを入力してください", works: [] };
    }
    const exactMatches = titles.filter((title) => title.includes(query));
    if (exactMatches.length === 0) {
      return { error: "該当するアニメが見つかりません", works: [] };
    }
    const result = await searchAnime(exactMatches);
    return result.error
      ? { error: result.error, works: [] }
      : { error: "", works: result.works };
  };

  const [state, formAction] = useActionState(action, initialState);

  return (
    <>
      <form action={formAction} className={searchArea}>
        <label>
          <span className={iconBox}>
            <IoSearch />
          </span>
          <input type="text" name="query" placeholder="キーワードで検索..." />
        </label>
      </form>

      <ul className={resultList}>
        {state.error ? (
          <p>{state.error}</p>
        ) : (
          state.works.map((work: animeType) => (
            <Card {...work} key={work.annictId} />
          ))
        )}
      </ul>
    </>
  );
};
