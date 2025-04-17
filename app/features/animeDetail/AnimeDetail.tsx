import { getSeason } from "@/app/hooks/getSeason";
import { prisma } from "@/app/lib/prisma";
import Image from "next/image";
import { RatingClient } from "./RatingClient";
import { FaCircleUser } from "react-icons/fa6";
import styles from "./animeDetail.module.css";
import { Register } from "../../components/register/Register";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
const {
  card,
  dataArea,
  seasonArea,
  row,
  reviewArea,
  noReview,
  isRegisteredLabel,
  registerArea,
} = styles;

export const AnimeDetail = async ({ id }: { id: number }) => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  const anime = await prisma.anime.findUnique({
    where: { id },
    include: {
      userAnime: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  const isRegistered = !!(await prisma.userAnime.findUnique({
    where: {
      userId_animeId: {
        userId: userId!,
        animeId: id,
      },
    },
  }));

  if (!anime)
    return (
      <section>
        <p>指定のアニメは存在しません。</p>
      </section>
    );

  const { title, seasonName, seasonYear, imageUrl, userAnime, reviews } = anime;

  const ratedReviews = reviews.filter(
    (r) => r.rating !== null && r.rating !== undefined
  );
  const averageRating =
    ratedReviews.length > 0
      ? (
          ratedReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
          ratedReviews.length
        ).toFixed(1)
      : null;

  return (
    <section>
      <div className={card}>
        {imageUrl && (
          <Image src={imageUrl} alt={title} width={300} height={100} />
        )}
        <div className={dataArea}>
          <h2>{title}</h2>
          <div className={seasonArea}>
            {seasonYear && <p>{seasonYear}年</p>}
            {seasonName && <p>{getSeason(seasonName)}</p>}
          </div>
          <dl>
            <div className={row}>
              <dt>登録ユーザー数</dt>
              <dd>{userAnime.length}人</dd>
            </div>
            <div className={row}>
              <dt>レビュー数</dt>
              <dd>{reviews.length}</dd>
            </div>
            <div className={row}>
              <dt>みんなの評価</dt>
              <dd>
                {averageRating ? (
                  `星 ${averageRating}`
                ) : (
                  <span className={noReview}>評価はまだありません</span>
                )}
                <br />
                <RatingClient value={Number(averageRating)} />
              </dd>
            </div>
          </dl>
        </div>

        <div className={reviewArea}>
          <h3>みんなのレビュー</h3>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <div>
                    {review.user.image ? (
                      <Image
                        width={50}
                        height={50}
                        alt="profile-icon"
                        src={review.user.image}
                      />
                    ) : (
                      <FaCircleUser />
                    )}
                    <span>{review.user.name ?? "ゲスト"}</span>
                    <RatingClient value={Number(review.rating)} />
                  </div>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={noReview}>レビューはまだありません。</p>
          )}
        </div>
        <div className={registerArea}>
        {isRegistered ? (
          <p className={isRegisteredLabel}>登録済み</p>
        ) : (
          <Register
            id={id}
            title={title}
            seasonYear={seasonYear}
            seasonName={seasonName}
            imageUrl={imageUrl}
          />
        )}
        </div>
      </div>
    </section>
  );
};
