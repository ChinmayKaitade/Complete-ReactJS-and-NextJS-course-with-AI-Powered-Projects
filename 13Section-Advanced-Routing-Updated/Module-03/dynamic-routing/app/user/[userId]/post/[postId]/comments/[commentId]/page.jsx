import React from "react";

const DynamicCommentIdPage = async ({ params }) => {
  const { userId, postId, commentId } = await params;

  return (
    <div>
      postId: {postId}
      userId: {userId}
      commentId: {commentId}
    </div>
  );
};

export default DynamicCommentIdPage;
