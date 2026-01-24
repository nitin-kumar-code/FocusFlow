const API_BASE = import.meta.env.VITE_API_BASE || "https://focusflow-icfj.onrender.com";

let onUnauthorized = null;

export function setOnUnauthorized(cb) {
  onUnauthorized = cb;
}
export async function apiFetch(path, { method = "GET", body, headers = {}, skipAuth = false } = {}) {
  const url = API_BASE + path;

  const token = localStorage.getItem("token");

  const finalHeaders = {
    ...headers,
  };

  if (!skipAuth) {
    finalHeaders["Content-Type"] = finalHeaders["Content-Type"] || "application/json";
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  } else {
    if (body && !finalHeaders["Content-Type"]) finalHeaders["Content-Type"] = "application/json";
  }

  const fetchOptions = {
    method,
    headers: finalHeaders,
  };

  if (body !== undefined) {
    fetchOptions.body = finalHeaders["Content-Type"] === "application/json" ? JSON.stringify(body) : body;
  }

  const res = await fetch(url, fetchOptions);

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      if (typeof onUnauthorized === "function") onUnauthorized();
      const message = (data && data.message) || "Unauthorized";
      const error = new Error(message);
      error.status = res.status;
      throw error;
    }

    const message = (data && data.message) || res.statusText || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    error.body = data;
    throw error;
  }

  return data;
}

export default apiFetch;
