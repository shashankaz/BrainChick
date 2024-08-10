import React, { useState, useEffect, useRef } from "react";
import ProfileHero from "./ProfileHero";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const quizContainerRef = useRef(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes`
        );
        const data = await response.json();
        setQuizzes(data.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const scrollLeft = () => {
    quizContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    quizContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <ProfileHero title={"Welcome to BrainChick"} name={true} />
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-6 sm:py-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-end">
            <h1 className="text-2xl sm:text-3xl font-semibold">Quizzes</h1>
            <p className="bg-slate-700 rounded-full p-2 h-7 w-7 flex items-center justify-center">
              {quizzes.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold hover:bg-slate-800 py-1 sm:py-2 px-2 sm:px-4 rounded-md cursor-pointer transition-all">
              <Link to={"/quizzes"}>View All</Link>
            </div>
            <div
              className="bg-slate-700 p-2 rounded-full text-sm cursor-pointer"
              onClick={scrollLeft}
            >
              <FaAngleLeft />
            </div>
            <div
              className="bg-slate-700 p-2 rounded-full text-sm cursor-pointer"
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
            {quizzes.map((quiz) => (
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
    </div>
  );
};

export default Home;
