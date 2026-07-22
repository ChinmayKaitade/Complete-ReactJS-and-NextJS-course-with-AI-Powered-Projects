"use server";
// import { revalidateTag } from "next/cache";
import { updateTag } from "next/cache";

// Get User List ✅
// export async function getUserList() {
//   const response = await fetch(
//     "https://6a605fc3b1933e9d25fd2367.mockapi.io/api/users/users",
//     // {
//     //   // cache: "no-store",
//     //   cache: "force-cache",
//     // },
//     {
//       next: {
//         tags: ["users"],
//         // revalidate: 20,
//       },
//     },
//   );
//   const data = await response.json();
//   return data;
// }

// export async function updateTheList() {
//   console.log("Updating the List...");
//   revalidateTag("users", "max");
// }

export async function deleteUser(id: string) {
  await fetch(`https://6a605fc3b1933e9d25fd2367.mockapi.io/api/users/${id}`, {
    method: "DELETE",
  });

  updateTag("users");
}

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;
  const avatar = formData.get("avatar") as string;

  await fetch(`https://6a605fc3b1933e9d25fd2367.mockapi.io/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  });

  updateTag("users");
}
