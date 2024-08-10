import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <h1 className="text-6xl md:text-8xl font-bold">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold mt-4">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-base md:text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="mt-6">
        <Link
          to={"/"}
          className="bg-teal-600 px-4 py-2 md:px-6 md:py-3 rounded-xl text-base md:text-lg hover:bg-teal-700 transition-all duration-300 ease-in-out"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
