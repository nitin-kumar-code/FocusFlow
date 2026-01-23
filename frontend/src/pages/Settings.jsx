import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your account and preferences.
        </p>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Account
          </h2>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-900">
              {email || "Logged in user"}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Actions
          </h2>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
