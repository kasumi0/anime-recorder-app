import { PropsWithChildren } from "react";
import styles from "./tabs.module.css";
import { TabLink } from "./components/TabLink";
import { StatusType } from "../types/types";
const { tabs, pageTitle } = styles;

const statuses: (StatusType | '')[] = [
  '',
  "WANT_TO_WATCH",
  "WATCHING",
  "COMPLETED",
  "ON_HOLD",
  "DROPPED",
];

export default function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <section>
      <h2 className={pageTitle}>My Page</h2>
      <nav className={tabs}>
        {statuses.map((status) => (
          <TabLink segment={status} key={status}/>
        ))}
      </nav>
      {children}
    </section>
  );
}
