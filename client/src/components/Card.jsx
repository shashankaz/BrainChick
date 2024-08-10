import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, imageUrl, title, difficulty }) => {
  return (
    <Link to={`/quiz/${id}`}>
      <div className="bg-slate-700 w-40 sm:w-48 md:w-60 h-56 sm:h-64 rounded-xl p-2 sm:p-3 hover:-translate-y-1 cursor-pointer transition-all ease-in-out">
        <div className="bg-black w-full h-24 sm:h-32 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            className="h-full w-full object-cover"
            alt="cover"
          />
        </div>
        <div className="mt-2 sm:mt-3 h-16 sm:h-20 flex flex-col justify-between font-semibold text-sm sm:text-base">
          <h1>{title}</h1>
          <h4 className="italic">{difficulty}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
