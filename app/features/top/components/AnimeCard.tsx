"use client";

import { Register } from "@/app/components/register/Register";
import { AnimeType } from "@/app/types/types";
import { getSeason } from "@/app/hooks/getSeason";
import Link from "next/link";
import styles from "../top.module.css";
import { Thumbnail } from "@/app/components/Thumbnail";
import { LinkProgressBar } from "@/app/components/linkProgressBar/LinkProgressBar";
const { isRegisteredLabel, body, linkCover, linkLogin } = styles;

type AnimeCardProps = AnimeType & {
  isRegistered: boolean;
  isLoggedIn: boolean;
  existsInAnime: boolean;
};

export const AnimeCard = ({
  annictId,
  image,
  title,
  seasonYear,
  seasonName,
  isRegistered,
  isLoggedIn,
  existsInAnime,
}: AnimeCardProps) => {
  const getRegister = () => {
    if (!isLoggedIn) {
      return (
        <Link href={"/login"} className={linkLogin}>
          ログインして登録
        </Link>
      );
    }
    if (isRegistered) {
      return <p className={isRegisteredLabel}>登録済み</p>;
    }
    const newProps = {
      id: annictId,
      title,
      seasonYear,
      seasonName,
      imageUrl: image?.facebookOgImageUrl,
    };
    return <Register {...newProps} />;
  };

  return (
    <li key={annictId}>
      <Thumbnail imageUrl={image?.facebookOgImageUrl} title={title} />
      <div className={body}>
        {existsInAnime && (
          <Link href={`/anime/${annictId}`} className={linkCover}>
            <LinkProgressBar size={8} />
          </Link>
        )}
        <h2>{title}</h2>
        <div>
          {seasonYear && <span>{`${seasonYear}年`}</span>}
          {seasonName && <span>{getSeason(seasonName)}</span>}
        </div>
        {getRegister()}
      </div>
    </li>
  );
};
