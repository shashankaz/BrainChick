import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileHero from "../components/ProfileHero";
import BarCard from "../components/BarCard";

const Quizzes = () => {
  const { category: paramCategory } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    paramCategory?.toLowerCase() || ""
  );
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value.toLowerCase());
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const quizTitle = quiz.title.toLowerCase();
    const quizDifficulty = quiz.difficulty.toLowerCase();
    const quizCategory = quiz.category.toLowerCase();

    const matchesSearch = quizTitle.includes(searchTerm);
    const matchesDifficulty =
      selectedDifficulty === "" || quizDifficulty === selectedDifficulty;
    const matchesCategory =
      selectedCategory === "" || quizCategory === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <ProfileHero title={"Quizzes"} />
      <div className="mx-4 md:mx-16 lg:mx-32 my-10">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center mb-8 gap-4">
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 w-full md:w-auto border border-slate-700 rounded-md bg-slate-800 text-white placeholder-gray-400 outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-teal-500"
            />
            <Btn text="Clear" onClick={() => setSearchTerm("")} />
          </form>

          <form className="flex gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 w-full md:w-auto border rounded-md bg-slate-800 border-slate-700 text-white outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Categories</option>
              <option value="web development">Web Development</option>
              <option value="programming">Programming</option>
              <option value="database">Database</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="cloud computing">Cloud Computing</option>
              <option value="artificial intelligence">
                Artificial Intelligence
              </option>
              <option value="blockchain">Blockchain</option>
              <option value="networking">Networking</option>
            </select>
            <Btn text="Reset" onClick={() => setSelectedCategory("")} />
          </form>

          <form className="flex gap-2 w-full md:w-auto">
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="p-2 w-full md:w-auto border rounded-md bg-slate-800 border-slate-700 text-white outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
            </select>
            <Btn text="Reset" onClick={() => setSelectedDifficulty("")} />
          </form>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <p className="text-teal-400 text-xl mt-10">Loading...</p>
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-teal-400 text-xl mt-10">No quizzes found.</p>
          </div>
        ) : (
          <div className="border border-slate-700 rounded-lg overflow-hidden">
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
        )}
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
      className="py-2 px-4 rounded-lg font-semibold flex justify-center bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {text}
    </button>
  );
};
