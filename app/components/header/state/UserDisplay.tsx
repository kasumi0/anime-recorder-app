"use client";

import { useUserStore } from "@/app/store/userStore";

type Props = {
  defaultName: string;
};

const UserDisplay = ({ defaultName }: Props) => {
  const name = useUserStore((state) => state.name);
  return <>{name || defaultName}</>;
};

export default UserDisplay;
