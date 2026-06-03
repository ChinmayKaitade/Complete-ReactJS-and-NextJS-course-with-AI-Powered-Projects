import React from "react";

const DynamicPostIdPage = async ({ params }) => {
  const { userId, postId } = await params;

  return (
    <div>
      postId: {postId}
      userId: {userId}
    </div>
  );
};

export default DynamicPostIdPage;
