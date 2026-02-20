import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8000/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const method = error.config?.method;

    if (["post", "put", "patch", "delete"].includes(method)) {
      const message =
        error?.response?.data?.detail?.[0]?.msg ||
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default api;
