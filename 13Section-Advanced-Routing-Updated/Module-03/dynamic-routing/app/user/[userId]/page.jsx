import { notFound } from "next/navigation";
import React from "react";

const DynamicUserIdPage = async ({ params }) => {
  const { userId } = await params;

  if (userId > 10) {
    notFound();
  }

  return <div>DynamicUserIdPage {userId}</div>;
};

export default DynamicUserIdPage;
