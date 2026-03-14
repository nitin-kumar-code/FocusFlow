import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";

import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../features/tasks/tasksApi";

export default function TasksPage() {
  const { data: tasks = [], isLoading: loading, error } = useGetTasksQuery();

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleAddTask = async ({ title, dueDate }) => {
    try {
      await addTask({ title, dueDate });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleQuickAction = async (taskId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "pending" ? "completed" : "pending";

      await updateTask({
        id: taskId,
        status: newStatus,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);
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
          <p className="text-red-600">Error loading tasks</p>
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