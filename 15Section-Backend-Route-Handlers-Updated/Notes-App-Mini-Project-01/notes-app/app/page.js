"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error("Error in Fetching Notes: ", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // console.log({
    //   title,
    //   content,
    // });

    if (!title || !content) {
      alert("All fields required. Please fill all fields!");
      return;
    }

    try {
      setIsLoading(true);
      if (editingId) {
        const res = await fetch(`/api/notes/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
          fetchNotes();
          alert("Notes Updated Successfully");
          setTitle("");
          setContent("");
        }
      } else {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
          fetchNotes();
          alert("Notes Created Successfully");
          setTitle("");
          setContent("");
        }
      }
    } catch (error) {
      console.error("Error in Saving Notes!", error);
      alert("Error in Saving Notes!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are You Sure")) return;

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error("Error in Deleting Notes: ", error);
      alert("Error in Deleting Notes!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">My Notes</h1>
          <p className="text-gray-400">
            Create, Read, Update and Delete Your Notes
          </p>
        </div>

        {/* form */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-800">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-400 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Note Title"
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-400 mb-2">
                Content
              </label>
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Enter Note Title"
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={IsLoading}
                className="flex-1 bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-600 transition font-semibold"
              >
                {IsLoading
                  ? "Saving..."
                  : editingId
                    ? "Update Note"
                    : "Add Note"}
              </button>
              {editingId && (
                <button
                  type="submit"
                  onClick={handleCancel}
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No Notes Yet. Create One to Get Started
              </p>
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800 "
              >
                <h2
                  className="text-xl
                 font-semibold text-yellow-400 mb-2"
                >
                  {note.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {note.content}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="flex-1 bg-yellow-500 text-gray-900 py-1 px-3 rounded hover:bg-yellow-600 transition text-sm font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="flex-1 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
