"use client";

import { useState, useTransition } from "react";
import { MyAnime } from "./MyAnime";
import { MyAnimeFromPrisma } from "@/app/types/types";
import styles from "./myAnime.module.css";
import { PER_PAGE } from "@/app/lib/pagination";
const { myAnimeList, moreButton } = styles;

type MyAnimeListProps = {
  initialAnimeList: MyAnimeFromPrisma[];
  totalCount: number;
  userId: string;
};

export const MyAnimeList = ({
  initialAnimeList,
  totalCount,
  userId,
}: MyAnimeListProps) => {
  const [animeList, setAnimeList] = useState(initialAnimeList);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = () => {
    const nextPage = page + 1;
    startTransition(async () => {
      const res = await fetch(`/api/user-anime?page=${nextPage}`);
      const { animeList: newAnimeList } = await res.json();
      setAnimeList((prev) => [...prev, ...newAnimeList]);
      setPage(nextPage);
    });
  };

  const hasMore = animeList.length < totalCount;
  const restCount = totalCount - animeList.length;
  const loadCount = restCount >= PER_PAGE ? PER_PAGE : restCount;

  return (
    <>
      <ul className={myAnimeList}>
        {animeList.map((anime) => (
          <MyAnime
            key={anime.id}
            id={anime.id}
            title={anime.title}
            defaultImage={anime.imageUrl}
            seasonName={anime.seasonName}
            seasonYear={anime.seasonYear}
            userId={userId}
            customImage={anime.userAnime?.[0]?.imageUrl}
            registerId={anime.userAnime[0].id}
            status={anime.statuses[0].state}
            rating={anime.reviews[0]?.rating ?? 0}
            comment={anime.reviews[0]?.comment ?? ""}
          />
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={handleLoadMore}
          className={moreButton}
          disabled={isPending}
        >
          {isPending
            ? `次の ${loadCount} 作品を取得中...`
            : `さらに表示（ 残り ${restCount} 作品 ）`}
        </button>
      )}
    </>
  );
};
