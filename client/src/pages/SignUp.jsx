import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../firebase";

const SignUp = () => {
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
    const { name, email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center px-4 py-10 sm:py-20">
      <div className="w-full max-w-lg bg-slate-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white">Sign Up</h1>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-teal-500 hover:text-teal-300 transition"
          >
            Sign In
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-6 space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="mt-1 p-3 w-full bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
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
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center justify-center text-gray-400">
          <span className="border-b w-1/4 border-gray-600"></span>
          <span className="mx-4">OR</span>
          <span className="border-b w-1/4 border-gray-600"></span>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-400">
          Want to explore without signing up?{" "}
          <Link to="/" className="text-teal-500 hover:text-teal-300 transition">
            Explore
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
