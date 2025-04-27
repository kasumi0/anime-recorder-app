import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { prisma } from "@/app/lib/prisma";
import { MyAnimeList } from "./components/myAnime/MyAnimeList";
import { StatusType } from "@/app/types/types";
import { PER_PAGE } from "@/app/lib/pagination";

export const MyPagePerStatus = async ({ status }: { status: StatusType }) => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  const [initialAnimeList, totalCount] = await Promise.all([
    prisma.anime.findMany({
      take: PER_PAGE,
      where: {
        statuses: { some: { state: status, userId } },
      },
      include: {
        userAnime: { where: { userId }, select: { id: true, imageUrl: true } },
        statuses: { where: { userId } },
        reviews: { where: { userId } },
      },
    }),
    prisma.status.count({
      where: { state: status, userId },
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
