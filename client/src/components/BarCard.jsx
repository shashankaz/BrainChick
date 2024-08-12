import React from "react";
import { Link } from "react-router-dom";

const BarCard = ({ id, title, description, category, difficulty }) => {
  return (
    <Link to={`/quiz/${id}`}>
      <div className="w-full h-auto md:h-44 p-4 flex flex-col md:flex-row gap-4 bg-slate-900 rounded-lg transition-transform duration-300 ease-in-out transform hover:bg-slate-800 hover:cursor-pointer">
        <div
          className="h-48 md:h-full w-full md:w-72 rounded-lg overflow-hidden p-4 flex items-center justify-center"
          style={{
            backgroundColor: "#334155",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <h1 className="text-white text-lg font-bold text-center">{title}</h1>
        </div>
        <div className="flex-1 text-gray-200 flex flex-col justify-between">
          <div>
            <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-400">
              {description}
            </p>
          </div>
          <p className="mt-2 md:mt-4 text-sm md:text-base italic text-teal-400">
            {category} - {difficulty}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BarCard;
