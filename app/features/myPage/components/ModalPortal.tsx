"use client";

import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const ModalPortal = ({ children }: PropsWithChildren) => {
  const parent = document.querySelector("main");
  return createPortal(children, parent!);
};
