import apiFetch from "./api";

export async function getTasks() {
  return apiFetch("/api/tasks", { method: "GET" });
}
export async function createTask({ title, dueDate }) {
  return apiFetch("/api/tasks", {
    method: "POST",
    body: { title, dueDate },
  });
}

export async function updateTaskStatus(taskId, status) {
  return apiFetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: { status },
  });
}

export async function deleteTask(taskId) {
  return apiFetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
}
