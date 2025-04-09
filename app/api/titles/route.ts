import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  const graphqlQuery = {
    query: `
      query {
        searchWorks {
          nodes {
            title
          }
        }
      }
    `,
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
    return NextResponse.json(
      { error: "アニメタイトルの取得に失敗しました。" },
      { status: 500 }
    );
  }

  const json = await response.json();
  const titles =
    json.data?.searchWorks?.nodes.map(
      (node: { title: string }) => node.title
    ) || [];    

  return NextResponse.json({ titles });
}
