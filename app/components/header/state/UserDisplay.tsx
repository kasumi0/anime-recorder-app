"use client";

import Image from "next/image";
import { Link } from "../../linkProgressBar/Link";
import { FaCircleUser } from "react-icons/fa6";
import { useUserStore } from "@/app/store/userStore";
import style from "../header.module.css";
// import { useEffect } from "react";
const { userName } = style;

type Props = {
  defaultName: string;
  defaultIcon?: string | null;
};

export const UserDisplay = ({ defaultName, defaultIcon }: Props) => {
  const name = useUserStore((state) => state.name);
  const icon = useUserStore((state) => state.iconUrl);
  // const setIconUrl = useUserStore((state) => state.setIcon);
  // const setName = useUserStore((state) => state.setName);
  
  // useEffect(() => {
  //   if (!name) setName(defaultName);
  //   if (!icon && defaultIcon) setIconUrl(defaultIcon);
  // }, [name, setName, defaultIcon, icon, setIconUrl, defaultName]);

  const profileIcon = icon ?? defaultIcon;
  const profileName = name || defaultName;

  return (
    <Link href={"/profile"}>
      {profileIcon ? (
        <Image width={100} height={100} alt="profile icon" src={profileIcon} />
      ) : (
        <FaCircleUser />
      )}
      <span className={userName}>{profileName}</span>
    </Link>
  );
};
