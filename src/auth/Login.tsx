import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./schemas";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
    reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Enter your credentials to access your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className={`w-full px-4 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.password ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium rounded-md transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-4">
        Don’t have an account?{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
          <NavLink to={"/register"}>Register</NavLink>
        </span>
      </p>
    </div>
  );
};

export default Login;
