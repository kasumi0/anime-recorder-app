import { getSeason } from "@/app/hooks/getSeason";
import { prisma } from "@/app/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export const AnimeDetail = async ({ id }: { id: number }) => {
  const anime = await prisma.anime.findUnique({
    where: { id },
    include: {
      userAnime: true,
      reviews: true,
    },
  });

  if (!anime) notFound();

  const { title, seasonName, seasonYear, imageUrl, userAnime, reviews } = anime;

  const totalRegistered = userAnime.length;
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <section>
      <h1>{title}</h1>
      {seasonYear && <p>{seasonYear}年</p>}
      {seasonName && <p>{getSeason(seasonName)}</p>}
      {imageUrl && <Image src={imageUrl} alt={title} width={300} height={100} />}
      <p>登録ユーザー数: {totalRegistered}人</p>
      <p>平均評価: {averageRating ?? "未評価"}</p>

      <div>
        <h2>レビュー</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>⭐ {review.rating ?? "なし"}</p>
                <p>{review.comment ?? "コメントなし"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>レビューはまだありません。</p>
        )}
      </div>
    </section>
  );
};
