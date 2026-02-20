import { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import api from "../api/axios";
import Pagination from "../components/Pagination";
import type { User, PaginationList } from "../types/user";
import EditUser from "../modals/EditUser";

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationList>({
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async (page = 1) => {
    try {
      const res = await api.get("/users", {
        params: { page, search, limit: pagination.limit },
      });

      setUsers(res.data?.data);

      const pg = res.data?.pagination;

      setPagination({
        page: pg?.page || 1,
        limit: pg?.limit || 5,
        total: pg?.total || 0,
        totalPages: pg?.total_pages || 1,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await api.delete(`/users/${id}`);
      if (res.data) {
        toast.success("User deleted successfully");
        fetchUsers(pagination.page);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
        <span>
          <label className="me-2 text-gray-800">Search</label>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="p-3 border-b text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="p-3 border-b text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="p-3 border-b text-sm font-medium text-gray-700">
                Phone
              </th>
              <th className="p-3 border-b text-sm font-medium text-gray-700">
                Created At
              </th>
              <th className="p-3 border-b text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="p-3 border-b text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    {" "}
                    {(pagination.page - 1) * pagination.limit + i + 1}
                  </td>
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">{user.phone || "-"}</td>
                  <td className="p-3 border-b">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 border-b flex gap-2">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="p-2 rounded cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={fetchUsers}
      />

      {editingUser && (
        <EditUser
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdated={() => fetchUsers(pagination.page)}
        />
      )}
    </div>
  );
};

export default Dashboard;
