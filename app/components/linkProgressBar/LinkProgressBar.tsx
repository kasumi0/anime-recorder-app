"use client";

import { useLinkStatus } from "next/link";
import { PulseLoader } from "react-spinners";

export const LinkProgressBar = ({size = 6}) => {
  const status = useLinkStatus();
  return status.pending ? <PulseLoader color="#91bbb7" size={size} /> : null;
};
