import { connectDB } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await connectDB();

  return (
    <div>
      <h1>Notes App</h1>
    </div>
  );
}
