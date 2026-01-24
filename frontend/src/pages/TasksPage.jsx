import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import apiFetch from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await apiFetch("/api/tasks");
        const normalizedTasks = Array.isArray(data)
          ? data.map(task => ({
              ...task,
              dueDate: task.due_date,
            }))
          : [];
setTasks(normalizedTasks);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async ({ title, dueDate }) => {
    try {
      const newTask = await apiFetch("/api/tasks", {
        method: "POST",
        body: { title, dueDate },
      });

      const normalizedTask = {
  ...newTask,
  dueDate: newTask.due_date,
};
setTasks(prev => [normalizedTask, ...prev]);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleQuickAction = async (taskId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "pending" ? "completed" : "pending";

   const updatedTask = await apiFetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: { status: newStatus },
      });

      const normalizedUpdatedTask = {
  ...updatedTask,
  dueDate: updatedTask.due_date,
};

setTasks(prev =>
  prev.map(task =>
    task.id === taskId ? normalizedUpdatedTask : task
  )
);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      await apiFetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-gray-950 mb-2">
            Tasks
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your tasks and stay productive.
        </p>

        <AddTaskForm onAdd={handleAddTask} />

        {loading && (
          <p className="text-gray-500">Loading tasks...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        <div className="grid gap-4">
          {!loading && tasks.length === 0 && (
            <p className="text-gray-600">
              No tasks yet. Add your first one above.
            </p>
          )}

          {tasks.map(task => (
            <TaskCard
              key={task.id}
              {...task}
              onQuickAction={handleQuickAction}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 