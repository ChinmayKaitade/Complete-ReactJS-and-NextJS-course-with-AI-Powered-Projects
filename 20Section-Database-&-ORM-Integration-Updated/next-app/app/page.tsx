import { createUser } from "@/actions/action";
import { prisma } from "@/lib/db";

export default async function Home() {
  const data = await getAllUsers();

  console.log(data);

  return (
    <div>
      <h1>Create User</h1>

      <form action={createUser}>
        <input type="text" name="name" placeholder="Enter Your Name" required />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export async function getAllUsers() {
  const allUsers = await prisma.user.findMany();

  return allUsers;
}
