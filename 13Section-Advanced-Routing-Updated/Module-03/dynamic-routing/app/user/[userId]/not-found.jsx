import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
      <img src={"/not-found.svg"} height={400} width={400} />
      <h1 className="text-5xl font-extrabold text-indigo-500">
        404 User Not Found!
      </h1>
      <Link href={"/"} className="px-4 py-2 rounded-md bg-indigo-400 mt-6">
        Go To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
