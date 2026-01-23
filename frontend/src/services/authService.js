import apiFetch from "./api";

export async function register({ name, email, password }) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: { name, email, password },
    skipAuth: true,
  });
}
export async function login({ email, password }) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { email, password },
    skipAuth: true,
  });

  if (data && data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}
export function logout() {
  localStorage.removeItem("token");
}
