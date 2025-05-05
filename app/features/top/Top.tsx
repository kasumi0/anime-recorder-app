"use client";

import { Search } from "./components/Search";
import styles from "./top.module.css";
import { Anime } from "./components/Anime";
import { useCallback, useEffect, useState } from "react";
import { AnimeType } from "@/app/types/types";
import { searchAnime } from "@/app/lib/actions/searchAnime";
import { PER_PAGE } from "@/app/lib/pagination";
const { resultList, noAnime, moreButton } = styles;

export const Top = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [works, setWorks] = useState<AnimeType[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorks = useCallback(
    async (after?: string) => {
      setIsLoading(true);
      const result = await searchAnime([query!], PER_PAGE, after);
      if (result.status === "error") {
        setWorks([]);
        console.error(result.message);
        setIsLoading(false);
        return;
      }
      setWorks((prev) => (after ? [...prev, ...result.works] : result.works));
      setCursor(result.endCursor);
      setHasNext(result.hasNextPage);
      setIsLoading(false);
    },
    [query]
  );

  useEffect(() => {
    if (query) fetchWorks();
    else setWorks([]);
  }, [query, fetchWorks]);

  const fetchMore = () => fetchWorks(cursor);
  
  return (
    <section>
      <Search setQuery={setQuery}/>

      {query === null ? null : works?.length === 0 ? (
        <p className={noAnime}>該当するアニメが見つかりません</p>
      ) : (
        <>
          <ul className={resultList}>
            {works?.map((work) => (
              <Anime {...work} key={work.annictId} />
            ))}
          </ul>
          {hasNext && (
            <button
              onClick={fetchMore}
              disabled={isLoading}
              className={moreButton}
            >
              {isLoading ? "読み込み中..." : "さらに表示"}
            </button>
          )}
        </>
      )}
    </section>
  );
};
