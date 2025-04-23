"use client";

import { useEffect, useState } from "react";

export const UserCount = ({ init }: { init: number }) => {
  const [count, setCount] = useState(init);

  useEffect(() => {
    const handle = () => setCount((prev) => prev + 1);
    window.addEventListener("anime-registered", handle);
    return () => window.removeEventListener("anime-registered", handle);
  }, []);

  return <dd>{count}人</dd>;
};
