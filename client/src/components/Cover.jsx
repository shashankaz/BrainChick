import React from "react";
import { Link } from "react-router-dom";

const Cover = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-500 text-white h-[65vh] py-16 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 rounded-[30px] md:rounded-[40px] lg:rounded-[50px] shadow-lg mb-8">
      <div className="max-w-3xl flex flex-col items-center justify-center h-full mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to BrainChick
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6">
          Sharpen your skills with our carefully crafted quizzes on Web
          Development, Programming, and more.
        </p>
        <Link to="/signup">
          <button className="bg-white text-slate-900 hover:text-slate-500 font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-md transition-all">
            Start Your Journey
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cover;
