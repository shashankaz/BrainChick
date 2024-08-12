import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Card from "./Card";
import { Link } from "react-router-dom";

const QuizSection = ({ title, quizzes, category }) => {
  const quizContainerRef = useRef(null);

  const scrollLeft = () => {
    quizContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    quizContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const filteredQuizzes = quizzes.filter((quiz) => quiz.category === category);

  const lowerCaseCategory = category.toLowerCase();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-end">
          <h1 className="text-xl sm:text-3xl font-semibold">{title}</h1>
          <p className="bg-slate-700 rounded-full p-2 h-7 w-7 flex items-center justify-center">
            {filteredQuizzes.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/quizzes/${lowerCaseCategory}`}>
            <div className="font-semibold hover:bg-slate-800 py-1 sm:py-2 px-2 sm:px-4 rounded-md cursor-pointer transition-all text-sm sm:text-base">
              View All
            </div>
          </Link>
          <div
            className="bg-slate-700 p-1 sm:p-2 rounded-full text-sm cursor-pointer"
            onClick={scrollLeft}
          >
            <FaAngleLeft />
          </div>
          <div
            className="bg-slate-700 p-1 sm:p-2 rounded-full text-sm cursor-pointer"
            onClick={scrollRight}
          >
            <FaAngleRight />
          </div>
        </div>
      </div>
      <div
        className="mt-6 pt-2 overflow-x-auto no-scrollbar"
        ref={quizContainerRef}
      >
        <div className="flex gap-4">
          {filteredQuizzes.map((quiz) => (
            <Card
              id={quiz._id}
              key={quiz._id}
              title={quiz.title}
              difficulty={quiz.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
