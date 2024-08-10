import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex items-center justify-between h-20 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl sm:text-3xl font-semibold mr-4">
          <Link to={"/"}>BrainChick</Link>
        </div>
        <div className="hidden md:flex">
          <ul className="flex text-sm sm:text-lg gap-2 sm:gap-4">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/quizzes"}>Quizzes</Link>
            </li>
            <li>
              <Link to={"/leaderboard"}>Leaderboard</Link>
            </li>
          </ul>
        </div>
      </div>
      {user ? (
        <div className="ml-3">
          <div className="uppercase rounded-full font-semibold bg-teal-600 text-slate-900">
            <Link to={"/profile"}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-9 h-9 rounded-full"
                />
              ) : (
                <img
                  src="https://picsum.photos/100/100"
                  alt="profile"
                  className="w-9 h-9 rounded-full"
                />
              )}
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-end w-48 gap-2 ml-3">
          <Link to={"/signin"}>
            <div className="uppercase border-2 p-1 sm:p-2 rounded-lg text-xs sm:text-sm font-semibold border-teal-600 text-teal-600 ">
              Sign In
            </div>
          </Link>
          <Link to={"/signup"}>
            <div className="uppercase border-2 p-1 sm:p-2 rounded-lg text-xs sm:text-sm font-semibold border-teal-600 bg-teal-600 ">
              Sign Up
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
