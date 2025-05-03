'use client'
import { FaCircleUser } from "react-icons/fa6";
import styles from "./header.module.css";
import Image from "next/image";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { getServerSession } from "next-auth";
import { IoSearch } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { TbMoodEdit } from "react-icons/tb";
import { PiListHeart } from "react-icons/pi";
import { Link } from "../linkProgressBar/Link";
import { UserDisplay } from "./state/UserDisplay";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/app/store/userStore";
const { headerArea, header, iconArea, linkArea, userName } = styles;

export const Header = () => {
  const {data:session} = useSession();
  const user = session?.user;
  const name = useUserStore((state) => state.name)
  const icon = useUserStore((state) => state.iconUrl)

  return (
    <div className={headerArea}>
      <header className={header}>
        <h1>Anime Recorder</h1>
        <nav>
          <div className={iconArea}>
            {user ? (
              <UserDisplay defaultName={name || user.name || 'guest'} defaultIcon={icon ?? user.image ?? undefined} />
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
