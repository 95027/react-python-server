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
import type { AuthContextType, LoginPayload, User } from "../types/user";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (data: LoginPayload) => {
    try {
      const res = await api.post("/auth/login", data);

      if (res?.data) {
        localStorage.setItem("token", res.data?.token);
        let c=0;
        console.log("res", c++);
        await getUserByToken();
        navigate("/");
        toast.success("user logged in successfully");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("login");
    toast.success("User logout successfully...");
  };

  const getUserByToken = async () => {
    try {
      const res = await api.get("/auth/me");
      if (res?.data) {
        setCurrentUser(res.data?.data);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
