import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { AnimeType } from "@/app/types/types";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { AnimeCard } from "./AnimeCard";

export const Anime = async (props: AnimeType) => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  const isRegistered = userId
    ? !!(await prisma.userAnime.findUnique({
        where: {
          userId_animeId: {
            userId,
            animeId: props.annictId,
          },
        },
      }))
    : false;

  return (
    <AnimeCard
      {...props}
      isLoggedIn={!!session}
      isRegistered={isRegistered}
    />
  );
};
