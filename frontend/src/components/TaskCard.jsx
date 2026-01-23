export default function TaskCard({
  id,
  title,
  dueDate,
  status,
  onQuickAction,
  onDelete,
}) {
  const isCompleted = status === "completed";

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base font-semibold text-gray-950">
          {title}
        </h3>

        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Due: {dueDate
    ? new Date(dueDate).toLocaleDateString()
    : "No date"}
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => onDelete(id)}
          className="text-sm text-gray-500 hover:text-red-600"
        >
          Delete
        </button>

        <button
          onClick={() => onQuickAction(id, status)}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          {isCompleted ? "Reopen" : "Mark done"}
        </button>
      </div>
    </div>
  );
}
        