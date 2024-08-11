import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileHero from "../components/ProfileHero";
import BarCard from "../components/BarCard";

const Quizzes = () => {
  const { category: paramCategory } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(paramCategory?.toLowerCase() || "");
  const [quizzes, setQuizzes] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes`
        );
        const data = await response.json();
        setQuizzes(data.quizzes);

        const imagePromises = data.quizzes.map((quiz) => fetchRandomImage());

        const imageResults = await Promise.all(imagePromises);
        const imageMap = imageResults.reduce((acc, img, index) => {
          acc[data.quizzes[index]._id] = img;
          return acc;
        }, {});

        setImages(imageMap);
      } catch (error) {
        console.error("Error fetching quizzes or images:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(`https://picsum.photos/200/300`);
      return response.url;
    } catch (error) {
      console.error("Error fetching image:", error);
      return ""; // Return an empty string or a placeholder image URL in case of error
    }
  };

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
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 w-full md:w-auto border rounded-md border-gray-500 text-black outline-none"
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
              className="p-2 w-full md:w-auto border rounded-md border-gray-500 text-black outline-none"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
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
              imageUrl={images[quiz._id]} // Pass the image URL to BarCard
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
