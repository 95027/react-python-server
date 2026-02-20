import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import type { EditUserProps, User } from "../types/user";

const EditUser = ({ user, onClose, onUpdated }: EditUserProps) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user.name,
    email: user.email,
    phone: user.phone,
    status: user.status,
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleUpdate = async () => {
    try {
      setSubmitting(true);
      const res = await api.put(`/users/${user.id}`, formData);
      if (res.data) {
        toast.success("User updated successfully");
        onUpdated();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[400px] space-y-4">
        <h3 className="text-lg font-semibold">Edit User</h3>

        <input
          className="w-full border p-2 rounded"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />

        <input
          className="w-full border p-2 rounded"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />

        <input
          className="w-full border p-2 rounded"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
        />

        <select
          className="w-full border p-2 rounded"
          value={formData.status ? "1" : "0"}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value === "1" })
          }
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={submitting}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded"
          >
            {submitting ? "Submitting..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
