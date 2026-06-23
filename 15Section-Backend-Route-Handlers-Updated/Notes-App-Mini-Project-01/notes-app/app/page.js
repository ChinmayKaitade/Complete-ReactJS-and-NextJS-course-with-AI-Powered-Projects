import { connectDB } from "@/lib/db";

export default async function Home() {
  await connectDB();

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
