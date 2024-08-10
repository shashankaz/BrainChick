import React from "react";
import { Link } from "react-router-dom";

const Cover = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-500 text-white h-[500px] py-16 px-4 sm:px-8 md:px-16 lg:px-32 rounded-[50px] shadow-lg mb-8">
      <div className="max-w-3xl flex flex-col items-center justify-center h-full mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to BrainChick
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Sharpen your skills with our carefully crafted quizzes on Web
          Development, Programming, and more.
        </p>
        <Link to="/signup">
          <button className="bg-white text-slate-900 hover:text-slate-500 font-semibold py-3 px-6 rounded-lg shadow-md transition-all">
            Start Your Journey
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cover;
