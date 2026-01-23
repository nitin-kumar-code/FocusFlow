export default function NoteCard({
  id,
  title,
  content,
  onDelete,
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 hover:ring-indigo-200 transition">
      
      <h3 className="mb-2 text-base font-semibold text-gray-900 truncate">
        {title || "Untitled note"}
      </h3>

      <p className="mb-4 text-sm text-gray-600 line-clamp-4">
        {content || "No content"}
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => onDelete(id)}
          className="text-sm font-medium text-gray-400 hover:text-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
