"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { LinkProgressBar } from "./LinkProgressBar";
import { useHamburgerStore } from "@/app/store/hamburgerStore";
import { useEffect, useState } from "react";

interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
  className?: string;
}

export const Link = ({ children, ...props }: LinkProps) => {
  const isOpen = useHamburgerStore((state) => state.isOpen);
  const handleToggle = useHamburgerStore((state) => state.setIsOpen);
  const [linkState, setLinkState] = useState(false);
  const [wasPending, setWasPending] = useState(false);

  useEffect(() => {
    if (wasPending && !linkState && isOpen) {
      handleToggle();
    }
    setWasPending(linkState);
  }, [linkState, isOpen, handleToggle, wasPending]);

  return (
    <NextLink {...props}>
      {children}
      <LinkProgressBar setState={setLinkState} />
    </NextLink>
  );
}
