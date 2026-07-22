"use server";
import { revalidateTag } from "next/cache";

export async function getUserList() {
  const response = await fetch(
    "https://6a605fc3b1933e9d25fd2367.mockapi.io/api/users/users",
    // {
    //   // cache: "no-store",
    //   cache: "force-cache",
    // },
    {
      next: {
        tags: ["users"],
        // revalidate: 20,
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function updateTheList() {
  console.log("Updating the List...");
  revalidateTag("users", "max");
}
