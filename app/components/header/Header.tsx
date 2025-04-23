"use client";

import { FaCircleUser } from "react-icons/fa6";
import styles from "./header.module.css";
import { Link } from "@/app/components/linkProgressBar/Link";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { TbMoodEdit } from "react-icons/tb";
import { PiListHeart } from "react-icons/pi";
import { useSession } from "next-auth/react";
const { headerArea, header, iconArea, linkArea, userName } = styles;

export const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className={headerArea}>
      <header className={header}>
        <h1>Anime Recorder</h1>
        <nav>
          <div className={iconArea}>
            {user ? (
              <Link href={"/profile"}>
                {user.image ? (
                  <Image
                    width={50}
                    height={50}
                    alt="profile-icon"
                    src={user.image}
                  />
                ) : (
                  <FaCircleUser />
                )}
                <span className={userName}>{user.name ?? "guest"}</span>
              </Link>
            ) : (
              <Link href={"/login"}>
                <FaCircleUser />
              </Link>
            )}
          </div>

          <div className={linkArea}>
            <Link href={"/"}>
              <IoSearch />
              search
            </Link>

            {user ? (
              <>
                <Link href={"/myPage"}>
                  <PiListHeart strokeWidth={3} />
                  my page
                </Link>
                <Link href={"/profile"}>
                  <TbMoodEdit />
                  profile
                </Link>
                <form action="/api/auth/signout" method="POST">
                  <button>
                    <LuLogOut strokeWidth={2.2} />
                    logout
                  </button>
                </form>
              </>
            ) : (
              <Link href={"/login"}>
                <LuLogIn strokeWidth={2.2} />
                login
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};
