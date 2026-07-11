"use server";
import { connectDB } from "@/lib/db";
import Todo from "@/models/todo";
import { todoSchema } from "@/schemas/todo-schema";

export async function addTodo(data) {
  await connectDB();
  const validatedFields = todoSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    const newTodo = await Todo.create(validatedFields.data);
    return JSON.parse(JSON.stringify(newTodo));
  } catch (error) {
    return { error: "Failed to Create Todo" };
  }
}

export async function getTodos(params) {
  await connectDB();

  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to fetch Todos", error);
    throw new Error("Failed to fetch Todos");
  }
}
