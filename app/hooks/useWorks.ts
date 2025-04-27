import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchAnime } from "../lib/actions/searchAnime";
import { AnimeType } from "../types/types";
import { PER_PAGE } from "../lib/pagination";

export const useWorks = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";
  const hasQuery = !!query;

  const [works, setWorks] = useState<AnimeType[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorks = useCallback(
    async (after?: string) => {
      setIsLoading(true);
      const result = await searchAnime([query], PER_PAGE, after);
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
    if (hasQuery) {
      fetchWorks();
    } else {
      setWorks([]);
    }
  }, [hasQuery, fetchWorks]);

  const fetchMore = () => fetchWorks(cursor);

  return {
    works,
    hasNext,
    isLoading,
    hasQuery,
    fetchMore,
  };
};
