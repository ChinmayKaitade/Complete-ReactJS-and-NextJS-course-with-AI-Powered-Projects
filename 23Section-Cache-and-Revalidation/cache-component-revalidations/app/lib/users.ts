import { cacheLife, cacheTag } from "next/cache";

export async function getUsers() {
  "use cache";
  cacheLife("hours"); // cache for 1 hours
  cacheTag("users");

  const res = await fetch(
    "https://6a605fc3b1933e9d25fd2367.mockapi.io/api/users/users",
  );

  return res.json();
}



