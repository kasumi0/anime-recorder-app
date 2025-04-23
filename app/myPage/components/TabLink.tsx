"use client";

import { getStatus } from "@/app/hooks/getStatus";
import { StatusType } from "@/app/types/types";

import { useSelectedLayoutSegment } from "next/navigation";
import styles from "../tabs.module.css";
import { Link } from "@/app/components/linkProgressBar/Link";

const { active } = styles;

export const TabLink = ({ segment }: { segment: StatusType | "" }) => {
  const current = useSelectedLayoutSegment();
  const isActive = current === segment || (!segment && current === null);
  return (
    <Link
      href={segment ? `/myPage/${segment}` : "/myPage"}
      key={segment}
      className={isActive ? active : undefined}
    >
      {segment ? getStatus(segment) : "全て"}
    </Link>
  );
};
