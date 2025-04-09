import { FaCircleUser } from "react-icons/fa6";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { getServerSession } from "next-auth";
const { header } = styles;

export const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user

  return (
    <header className={header}>
      <h1>
        <Link href={"/"}>Anime Recorder</Link>
      </h1>
      <nav>
        {user ? (
          <>
            <Link href={"/myPage"}>my page</Link>
            <Link href={"/profile"}>profile</Link>
            <Link href={"/api/auth/signout"}>logout</Link>
          </>
        ) : (
          <Link href={"/login"}>login</Link>
        )}

        {user?.image ? (
          <Link href={"/profile"}>
            <Image
              width={50}
              height={50}
              alt="profile-icon"
              src={user.image}
            />
          </Link>
        ) : (
          <Link href={"/login"}>
            <FaCircleUser />
          </Link>
        )}
      </nav>
    </header>
  );
};
