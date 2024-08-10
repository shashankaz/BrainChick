import React, { useState, useEffect } from "react";
import ProfileHero from "../components/ProfileHero";
import BarCard from "../components/BarCard";

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [quizzes, setQuizzes] = useState([]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm);
    const matchesDifficulty =
      selectedDifficulty === "" || quiz.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen">
      <ProfileHero title={"Quizzes"} />
      <div className="mx-4 md:mx-16 lg:mx-32 my-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 w-full md:w-auto border border-gray-500 rounded-md text-black outline-none"
            />
            <Btn text="Clear" onClick={() => setSearchTerm("")} />
          </form>

          <form className="flex gap-2 w-full md:w-auto">
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="p-2 w-full md:w-auto border rounded-md border-gray-500 text-black outline-none"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Hard">Hard</option>
            </select>
            <Btn text="Reset" onClick={() => setSelectedDifficulty("")} />
          </form>
        </div>

        <div className="border border-gray-700 rounded-lg">
          {filteredQuizzes.map((quiz) => (
            <BarCard
              key={quiz._id}
              id={quiz._id}
              title={quiz.title}
              description={quiz.description}
              category={quiz.category}
              difficulty={quiz.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;

const Btn = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-teal-600 px-4 py-2 rounded-md w-20"
    >
      {text}
    </button>
  );
};
