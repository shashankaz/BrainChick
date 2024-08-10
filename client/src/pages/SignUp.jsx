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
      console.log(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
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
          Create Your Account
        </h1>
        <h5 className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to={"/signin"}
            className="uppercase hover:underline text-sm text-teal-600"
          >
            Sign In
          </Link>
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-600 mt-1">{errors.name.message}</p>
          )}

          <label htmlFor="email" className="mt-4">
            Email*
          </label>
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 mt-1">{errors.password.message}</p>
          )}

          <button
            className="bg-teal-600 mt-8 uppercase rounded-md py-3 font-semibold"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="my-4 text-center">
          <span>or</span>
        </div>
        <button
          className="bg-blue-600 uppercase rounded-md py-3 font-semibold w-full"
          type="button"
          onClick={handleGoogleSignUp}
        >
          Continue with Google
        </button>
        <h5 className="mt-4 text-center">
          Continue without signing in?{" "}
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

export default SignUp;
