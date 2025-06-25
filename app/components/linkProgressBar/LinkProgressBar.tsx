"use client";

import { useEffect } from "react";
import { useLinkStatus } from "next/link";
import { PulseLoader } from "react-spinners";

type props = {
  size?: number;
  setState?: (isPending: boolean) => void;
};

export const LinkProgressBar = ({ size = 6, setState }: props) => {
  const status = useLinkStatus();
  useEffect(() => {
    if (setState) {
      setState(status.pending);
    }
  }, [status.pending, setState]);
  return status.pending ? <PulseLoader color="#91bbb7" size={size} /> : null;
};
