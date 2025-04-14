import { searchAnime } from "@/app/lib/actions/searchAction";
import { Search } from "./components/Search";
import { Anime } from "./components/Anime";
import styles from "./top.module.css";
import { AnimeType } from "@/app/types/types";
const { resultList, noAnime } = styles;

type SearchParamsType = {
  searchParams?: { query?: string };
};

export const Top = async ({ searchParams = {} }: SearchParamsType) => {
  const query = searchParams.query?.trim();
  const hasQuery = !!query;
  const result = hasQuery ? await searchAnime([query]) : null;
  const works = result?.works || [];

  return (
    <section>
      <Search />

      {!hasQuery ? null : works.length === 0 ? (
        <p className={noAnime}>該当するアニメが見つかりません</p>
      ) : (
        <ul className={resultList}>
          {works.map((work: AnimeType) => (
            <Anime {...work} key={work.annictId} />
          ))}
        </ul>
      )}
    </section>
  );
};
