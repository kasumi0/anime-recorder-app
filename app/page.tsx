import { Suspense } from "react";
import { Top } from "./features/top/Top";

export default function Home() {
  return (
    <Suspense>
      <Top />
    </Suspense>
  );
}
