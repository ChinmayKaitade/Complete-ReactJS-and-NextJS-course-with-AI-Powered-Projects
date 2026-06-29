"use client";

import { redirect, usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect("/login");
  }

  console.log("You are logged in");
  return (
    <div>
      <h1>Current Pathname:{pathname}</h1>
    </div>
  );
}
