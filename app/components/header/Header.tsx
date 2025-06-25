"use client";
import { FaCircleUser } from "react-icons/fa6";
import styles from "./header.module.css";
import { IoSearch } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { TbMoodEdit } from "react-icons/tb";
import { PiListHeart } from "react-icons/pi";
import { Link } from "../linkProgressBar/Link";
import { UserDisplay } from "./state/UserDisplay";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/app/store/userStore";
import { useHamburgerStore } from "@/app/store/hamburgerStore";
const { headerArea, hamburger, header, iconArea, linkArea, open } = styles;

export const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const name = useUserStore((state) => state.name);
  const icon = useUserStore((state) => state.iconUrl);
  const isOpen = useHamburgerStore((state) => state.isOpen);
  const handleToggle = useHamburgerStore((state) => state.setIsOpen);

  return (
    <div className={`${headerArea} ${isOpen ? open : ''}`}>
      <header className={header}>
        <h1>Anime Recorder</h1>
        <button type="button" className={hamburger} onClick={handleToggle}>
          <span></span>
          <span></span>
        </button>
        <nav>
          <div className={iconArea}>
            {user ? (
              <UserDisplay
                defaultName={name || user.name || "guest"}
                defaultIcon={icon ?? user.image ?? undefined}
              />
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
