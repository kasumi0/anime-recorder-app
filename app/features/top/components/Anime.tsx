"use client";

import { Register } from "@/app/components/register/Register";
import { AnimeType } from "@/app/types/types";
import { getSeason } from "@/app/hooks/getSeason";
import Link from "next/link";
import styles from "../top.module.css";
import { Thumbnail } from "@/app/components/Thumbnail";
import { LinkProgressBar } from "@/app/components/linkProgressBar/LinkProgressBar";
import { useEffect, useState } from "react";
const { isRegisteredLabel, body, linkCover, linkLogin } = styles;

export const Anime = ({
  annictId,
  image,
  title,
  seasonYear,
  seasonName,
}: AnimeType) => {
  const [status, setStatus] = useState({
    isLoggedIn: false,
    isRegistered: false,
    existsInAnime: false,
  });

  useEffect(() => {
    console.log(`[Anime] mounted: annictId=${annictId}`); // 👈 マウントログ追加

    const fetchStatus = async () => {
      console.log(`[Anime] fetchStatus start: annictId=${annictId}`); // 👈 fetch開始ログ追加

      const res = await fetch("/api/anime-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animeId: annictId }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`[Anime] fetchStatus success: annictId=${annictId}`, data); // 👈 fetch成功ログ追加

        setStatus(data);
      }
    };

    fetchStatus();
  }, [annictId]);

  const getRegister = () => {
    if (!status.isLoggedIn) {
      return (
        <Link href={"/login"} className={linkLogin}>
          ログインして登録
        </Link>
      );
    }
    if (status.isRegistered) {
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
        {status.isLoggedIn && status.existsInAnime && (
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
