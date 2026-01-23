 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchOverview = async () => {
    try {
      const token = localStorage.getItem("token");

      const [tasksRes, notesRes] = await Promise.all([
        fetch("http://localhost:5001/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5001/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!tasksRes.ok || !notesRes.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const tasksData = await tasksRes.json();
      const notesData = await notesRes.json();

      setTasks(tasksData);
      setNotes(notesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchOverview();
}, []);


  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

    const totalNotes = notes.length;
    const recentNotes = notes.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-gray-950 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Here’s a quick overview of your productivity.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading overview…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 ring-1 ring-gray-200">
              <p className="text-sm font-medium text-gray-500">
                Total Tasks
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-950">
                {total}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 ring-1 ring-gray-200">
              <p className="text-sm font-medium text-gray-500">
                Pending
              </p>
              <p className="mt-2 text-3xl font-semibold text-orange-600">
                {pending}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 ring-1 ring-gray-200">
              <p className="text-sm font-medium text-gray-500">
                Completed
              </p>
              <p className="mt-2 text-3xl font-semibold text-green-600">
                {completed}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-600 p-6 text-white">
              <p className="text-sm font-medium opacity-90">
                Completion Rate
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {completionRate}%
              </p>
            </div>
          </div>
        )}

        {!loading && total > 0 && (
          <p className="mt-8 text-gray-600">
            {completionRate >= 70
              ? "Great work! You’re staying on track."
              : "Keep going — small steps add up."}
          </p>
        )}
      </div>

      <div className="mt-10">
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
    
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Notes
      </h2>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        📝
      </div>
    </div>

    <div className="mb-5">
      <p className="text-sm text-gray-500">
        Total notes
      </p>
      <p className="text-3xl font-semibold text-indigo-600">
        {totalNotes}
      </p>
    </div>

    <div className="h-px bg-gray-100 my-4" />

    <div className="space-y-2 mb-4">
      {recentNotes.length > 0 ? (
        recentNotes.map(note => (
          <div
            key={note.id}
            className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 truncate"
          >
            {note.title || "Untitled note"}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">
          No notes yet. Start writing your ideas.
        </p>
      )}
    </div>

    <div className="text-right">
      <Link
        to="/notes"
        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        View all notes
        <span aria-hidden>→</span>
      </Link>
    </div>
  </div>
</div>
    </div>  
  );
}