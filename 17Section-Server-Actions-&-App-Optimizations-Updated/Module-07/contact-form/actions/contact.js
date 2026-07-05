"use server";

import { dbConnect } from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createContact(formData) {
  await dbConnect();

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  await Contact.create({
    name,
    email,
    message,
  });

  //   console.log("Data Saved Successfully!");

  //   return {
  //     message: "Contact Created Successfully!",
  //   };

  redirect("/dashboard");
}

export async function updateStatus(id) {
  await dbConnect();

  await Contact.findByIdAndUpdate(id, {
    status: "resolved",
  });

  revalidatePath("/dashboard");
}
