import React from "react";
import { Link } from "react-router-dom";

const BarCard = ({
  id,
  imageUrl,
  title,
  description,
  category,
  difficulty,
}) => {
  return (
    <Link to={`/quiz/${id}`}>
      <div className="w-full h-auto md:h-44 p-4 flex flex-col md:flex-row gap-4 hover:bg-slate-800 hover:cursor-pointer">
        <div className="bg-black h-48 md:h-full w-full md:w-72 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            className="h-full w-full object-cover"
            alt="cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
          <p className="mt-2 md:mt-4 text-sm md:text-base">{description}</p>
          <p className="mt-2 md:mt-4 text-sm md:text-base italic">
            {category} - {difficulty}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BarCard;
