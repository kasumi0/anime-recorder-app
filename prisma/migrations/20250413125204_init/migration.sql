-- CreateEnum
CREATE TYPE "WatchState" AS ENUM ('WANT_TO_WATCH', 'WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "hashedPassword" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "seasonName" TEXT,
    "seasonYear" INTEGER,
    "imageUrl" TEXT,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnime" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "UserAnime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" INTEGER NOT NULL,
    "comment" TEXT,
    "rating" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" INTEGER NOT NULL,
    "state" "WatchState" NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnime_userId_animeId_key" ON "UserAnime"("userId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_animeId_key" ON "Review"("userId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_userId_animeId_key" ON "Status"("userId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
