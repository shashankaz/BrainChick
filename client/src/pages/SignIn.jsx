import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../firebase";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-slate-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white">Sign In</h1>
        <p className="mt-4 text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-500 hover:text-teal-300 transition"
          >
            Sign Up
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-6 space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 p-3 w-full bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 p-3 w-full bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md py-3 transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center justify-center text-gray-400">
          <span className="border-b w-1/4 border-gray-600"></span>
          <span className="mx-4">OR</span>
          <span className="border-b w-1/4 border-gray-600"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-400">
          Want to explore without signing in?{" "}
          <Link to="/" className="text-teal-500 hover:text-teal-300 transition">
            Explore
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
