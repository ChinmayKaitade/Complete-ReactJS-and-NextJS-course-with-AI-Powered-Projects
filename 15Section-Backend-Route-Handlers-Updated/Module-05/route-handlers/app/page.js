"use client";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Todo Created: " + data.todo.title);
    } else {
      setMessage("Failed to Create Todo!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl py-2">Create Todo</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2"
          type="text"
          placeholder="Your Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <button className="p-2 mx-4 rounded-md hover:bg-blue-700 bg-blue-600 text-white" type="submit">
          Submit
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
