"use client";

import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  return (
    <div>
      <h1>Current Pathname:{pathname}</h1>
    </div>
  );
}
