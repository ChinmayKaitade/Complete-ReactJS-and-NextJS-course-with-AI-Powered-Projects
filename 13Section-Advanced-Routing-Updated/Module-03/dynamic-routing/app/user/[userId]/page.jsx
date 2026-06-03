import React from "react";

const DynamicUserIdPage = async ({ params }) => {
  const { userId } = await params;

  return <div>DynamicUserIdPage {userId}</div>;
};

export default DynamicUserIdPage;
