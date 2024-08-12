import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, difficulty }) => {
  return (
    <Link to={`/quiz/${id}`}>
      <div className="bg-slate-800 w-44 sm:w-52 md:w-64 h-64 sm:h-72 rounded-lg p-3 hover:shadow-lg hover:-translate-y-2 cursor-pointer transition-transform duration-300 ease-in-out">
        <div
          className="w-full h-28 sm:h-36 rounded-lg overflow-hidden p-2 flex items-center justify-center"
          style={{
            backgroundColor: "#334155",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <h1 className="text-white md:text-lg font-bold text-center">
            {title}
          </h1>
        </div>
        <div className="mt-3 h-20 sm:h-24 flex flex-col justify-between text-gray-200">
          <h1 className="text-base sm:text-lg font-bold truncate">{title}</h1>
          <h4 className="italic text-sm sm:text-base text-gray-400">
            {difficulty}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
