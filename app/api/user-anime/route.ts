import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { PER_PAGE } from "@/app/lib/pagination";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
      userAnime: { where: { userId }, select: { id: true, imageUrl:true } },
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
