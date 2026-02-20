import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

        {currentUser && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{currentUser.name}</span>
            <button
              onClick={() => {
                if (!confirm("Are you sure to logout ?")) return;
                logout();
              }}
              className="px-3 py-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-md transition"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-gray-500 text-sm py-3 shadow-inner">
        &copy; {new Date().getFullYear()} User Management App. All rights
        reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
