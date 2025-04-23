import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PER_PAGE = 12;

export async function GET(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);

  const animeList = await prisma.anime.findMany({
    skip: (page - 1) * PER_PAGE,
    take: PER_PAGE,
    where: {
      userAnime: {
        some: { userId },
      },
    },
    include: {
      userAnime: { where: { userId }, select: { id: true } },
      statuses: { where: { userId } },
      reviews: { where: { userId } },
    },
  });

  const totalCount = await prisma.anime.count({
    where: {
      userAnime: {
        some: { userId },
      },
    },
  });

  return NextResponse.json({
    animeList,
    totalCount,
  });
}
