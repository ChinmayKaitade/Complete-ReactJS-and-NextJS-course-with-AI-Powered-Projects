import UserList from "@/components/user-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <h1>Users Directory</h1>

      <Suspense fallback={<p>Loading Users...</p>}>
        <UserList />
      </Suspense>
    </>
  );
}
