import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, imageUrl, title, difficulty }) => {
  return (
    <Link to={`/quiz/${id}`}>
      <div className="bg-slate-800 w-44 sm:w-52 md:w-64 h-64 sm:h-72 rounded-lg p-3 hover:shadow-lg hover:-translate-y-2 cursor-pointer transition-transform duration-300 ease-in-out">
        <div className="bg-gray-900 w-full h-28 sm:h-36 rounded-lg overflow-hidden shadow-md">
          <img
            src={imageUrl}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            alt="cover"
          />
        </div>
        <div className="mt-3 h-20 sm:h-24 flex flex-col justify-between text-gray-200">
          <h1 className="text-base sm:text-lg font-bold truncate">{title}</h1>
          <h4 className="italic text-sm sm:text-base text-gray-400">{difficulty}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
