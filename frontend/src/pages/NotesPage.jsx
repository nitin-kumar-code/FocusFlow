import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://focusflow-icfj.onrender.com/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() && !content.trim()) {
      setError("Title or content is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://focusflow-icfj.onrender.com/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create note");
      }

      const newNote = await res.json();
      setNotes((prev) => [newNote, ...prev]);

      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    const confirmDelete = window.confirm("Delete this note?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://focusflow-icfj.onrender.com/api/notes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-gray-950 mb-2">
          Notes
        </h1>
        <p className="text-gray-600 mb-8">
          Capture ideas, thoughts, and reminders.
        </p>

        <form
          onSubmit={handleAddNote}
          className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Note title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Add note
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}
        </form>

        {loading && <p className="text-gray-500">Loading notes…</p>}

        {!loading && notes.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
     <p className="font-medium">No notes yet</p>
     <p className="text-sm mt-1">
    Start writing your ideas above.
     </p>
      </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {notes.map(note => (
    <NoteCard
      key={note.id}
      id={note.id}
      title={note.title}
      content={note.content}
      onDelete={handleDeleteNote}
    />
  ))}
</div>
      </div>
    </div>
  );
}
