import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import type { AuthContextType, User } from "../types/user";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (data: User) => {
    try {
      const res = await api.post("/auth/login", data);

      if (res?.data) {
        await getUserByToken();
        navigate("/");
        toast.success("user logged in successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error while logged in");
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("auth/logout");
      if (res?.data) {
        navigate("login");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error while logout");
    }
  };

  const getUserByToken = async () => {
    try {
      const res = await api.get("/auth/me");
      if (res?.data) {
        setCurrentUser(res.data?.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserByToken();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, getUserByToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
