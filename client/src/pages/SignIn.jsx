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
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 shadow-lg rounded-md">
        <h1 className="text-2xl font-semibold text-center">
          Sign In To Your Account
        </h1>
        <h5 className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to={"/signup"}
            className="uppercase hover:underline text-sm text-teal-600"
          >
            Sign Up
          </Link>
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600 mt-1">{errors.email.message}</p>
          )}

          <label htmlFor="password" className="mt-4">
            Password*
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-600 mt-1">{errors.password.message}</p>
          )}

          <button
            className="bg-teal-600 mt-8 uppercase rounded-md py-3 font-semibold"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="my-4 text-center">
          <span>or</span>
        </div>
        <button
          className="bg-blue-600 uppercase rounded-md py-3 font-semibold w-full"
          type="button"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
        <h5 className="mt-4 text-center">
          Continue without signin?{" "}
          <Link
            to={"/"}
            className="uppercase hover:underline text-sm text-teal-600"
          >
            Explore
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default SignIn;
