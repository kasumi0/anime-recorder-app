"use server";

import { SearchWorksQueryResponse, SearchWorksResponse } from "@/app/types/types";
import { PER_PAGE } from "../pagination";

export const searchAnime = async (
  titles: string[],
  first = PER_PAGE,
  after?: string
)
:Promise<SearchWorksResponse> => {
  if (!titles.length) {
    return { status: "error", message: "キーワードを入力してください" };
  }

  const query = `
    query ($titles: [String!]!, $first: Int!, $after: String) {
      searchWorks(
        titles: $titles
        orderBy: { field: WATCHERS_COUNT, direction: DESC }
        first: $first
        after: $after
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            annictId
            title
            seasonName
            seasonYear
            image {
              facebookOgImageUrl
            }
          }
        }
      }
    }
  `;

  const graphqlQuery = { query, variables: { titles, first, after } };

  const response = await fetch(process.env.NEXT_PUBLIC_ANNICT_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ANNICT_ACCESS_TOKEN!}`,
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    return { status: "error", message: "アニメの取得に失敗しました。" };
  }

  const json = await response.json();
  const data: SearchWorksQueryResponse | undefined = json.data?.searchWorks;
  if (!data || data.edges.length === 0) {
    return { status: "error", message: "該当するアニメが見つかりません" };
  }

  return {
    status: "success",
    works: data.edges.map((edge) => edge.node),
    endCursor: data.pageInfo.endCursor,
    hasNextPage: data.pageInfo.hasNextPage,
  };
};
