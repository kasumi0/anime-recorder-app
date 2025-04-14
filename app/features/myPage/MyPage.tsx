import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { prisma } from "@/app/lib/prisma";
import styles from "./myPage.module.css";
import { MyAnime } from "./components/myAnime/MyAnime";
const { pageTitle, myAnimeList } = styles;

export const MyPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;
  const registered = await prisma.anime.findMany({
    where: {
      userAnime: {
        some: { userId },
      },
    },
    include: {
      userAnime: {
        where: { userId },
        select: { id: true },
      },
      statuses: {
        where: { userId },
      },
      reviews: {
        where: { userId },
      },
    },
  });

  return (
    <section>
      <h2 className={pageTitle}>My Page</h2>
      <ul className={myAnimeList}>
        {registered.map((anime) => (
          <MyAnime
            id={anime.id}
            title={anime.title}
            imageUrl={anime.imageUrl}
            seasonName={anime.seasonName}
            seasonYear={anime.seasonYear}
            userId={userId!}
            registerId={anime.userAnime[0].id}
            status={anime.statuses[0]?.state ?? ""}
            rating={anime.reviews[0]?.rating ?? 0}
            comment={anime.reviews[0]?.comment ?? ""}
            key={anime.id}
          />
        ))}
      </ul>
    </section>
  );
};
