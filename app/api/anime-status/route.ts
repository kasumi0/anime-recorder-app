import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  let animeId: number;

  try {
    const body = await req.json();
    animeId = body.animeId;
  } catch {
    return NextResponse.json(
      { error: "Invalid or missing JSON in request body" },
      { status: 400 }
    );
  }

  if (!animeId) {
    return NextResponse.json({ error: "No animeId provided" }, { status: 400 });
  }

  const isRegistered = userId
    ? !!(await prisma.userAnime.findUnique({
        where: {
          userId_animeId: {
            userId,
            animeId,
          },
        },
      }))
    : false;

  const existsInAnime = !!(await prisma.userAnime.findFirst({
    where: {
      animeId,
    },
  }));

  return NextResponse.json({
    isLoggedIn: !!session,
    isRegistered,
    existsInAnime,
  });
}
