"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addPost(newPost) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export default function AddPost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post Added!");
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <button
      className="px-4 py-2 bg-amber-400 text-white rounded-md mt-10"
      onClick={() =>
        mutation.mutate({
          title: "New Post by Chinmay",
          body: "Demo Message",
          userId: 1,
        })
      }
    >
      Add Post
    </button>
  );
}
