import { getUserList, updateTheList } from "@/actions";

export default async function Home() {
  const data = await getUserList();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold mb-8">User List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {data.map((user: any, index: number) => (
          <div
            key={user.id}
            className="bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <p>{index + 1}</p>

            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              width={100}
              height={100}
              className="rounded-full mb-4"
            />

            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>

      <form action={updateTheList}>
        <button type="submit">Refresh Users</button>
      </form>
    </div>
  );
}
