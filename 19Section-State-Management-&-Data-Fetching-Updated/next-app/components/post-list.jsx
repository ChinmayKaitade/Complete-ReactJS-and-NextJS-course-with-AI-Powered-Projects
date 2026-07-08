"use client";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

export default function PostsList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error Fetching Posts</p>;

  return (
    <div>
      {data.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
