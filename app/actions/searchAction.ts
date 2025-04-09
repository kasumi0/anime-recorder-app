"use server";

export const searchAnime = async (titles: string[]) => {
  if (!titles.length) {
    return { error: "タイトルを入力してください" };
  }

  const graphqlQuery = {
    query: `
      query ($titles: [String!]!) {
        searchWorks(
          titles: $titles,
          orderBy: { field: WATCHERS_COUNT, direction: DESC }
        ) {
          nodes {
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
    `,
    variables: { titles },
  };

  const response = await fetch(process.env.NEXT_PUBLIC_ANNICT_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ANNICT_ACCESS_TOKEN!}`,
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    return { error: "アニメの取得に失敗しました。" };
  }

  const json = await response.json();
  const works = json.data?.searchWorks?.nodes;
  return works?.length ? { works } : { error: "該当するアニメが見つかりません" };
};
