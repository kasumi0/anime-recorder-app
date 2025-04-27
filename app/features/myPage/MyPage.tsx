import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { prisma } from "@/app/lib/prisma";
import { MyAnimeList } from "./components/myAnime/MyAnimeList";
import { PER_PAGE } from "@/app/lib/pagination";

export const MyPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  const [initialAnimeList, totalCount] = await Promise.all([
    prisma.anime.findMany({
      take: PER_PAGE,
      where: {
        userAnime: { some: { userId } },
      },
      include: {
        userAnime: { where: { userId }, select: { id: true, imageUrl: true } },
        statuses: { where: { userId } },
        reviews: { where: { userId } },
      },
    }),
    prisma.anime.count({
      where: { userAnime: { some: { userId } } },
    }),
  ]);

  return (
    <MyAnimeList
      initialAnimeList={initialAnimeList}
      totalCount={totalCount}
      userId={userId!}
    />
  );
};
