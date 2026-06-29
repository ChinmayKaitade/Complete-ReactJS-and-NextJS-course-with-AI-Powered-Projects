"use client";
import { createTodo } from "@/actions/actions";

export default function Home() {
  // async function createTodo(formData) {
  //   "use server";

  //   const title = formData.get("title");
  //   console.log("Creating a Todo: ", title);
  // }

  return (
    <form action={createTodo}>
      <input name="title" />
      <button type="submit">Add Todo</button>
    </form>
  );
}
