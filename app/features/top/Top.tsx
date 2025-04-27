"use client";

import { Search } from "./components/Search";
import styles from "./top.module.css";
import { Anime } from "./components/Anime";
import { useWorks } from "@/app/hooks/useWorks";

const { resultList, noAnime, moreButton } = styles;

export const Top = () => {
  const { works, hasNext, isLoading, hasQuery, fetchMore } = useWorks();
  return (
    <section>
      <Search />

      {!hasQuery ? null : works?.length === 0 ? (
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
