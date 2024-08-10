import React, { useState, useEffect } from "react";
import ProfileHero from "./ProfileHero";
import QuizSection from "./QuizSection";

const Home = () => {
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

  return (
    <div className="min-h-screen">
      <ProfileHero title={"Welcome to BrainChick"} name={true} />
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-6 sm:py-10">
        <QuizSection
          title="Web Development"
          quizzes={quizzes}
          category="Web Development"
        />
        <div className="mt-8">
          <QuizSection
            title="Programming"
            quizzes={quizzes}
            category="Programming"
          />
        </div>
        <div className="mt-8">
          <QuizSection title="Database" quizzes={quizzes} category="Database" />
        </div>
        <div className="mt-8">
          <QuizSection
            title="Cybersecurity"
            quizzes={quizzes}
            category="Cybersecurity"
          />
        </div>
        <div className="mt-8">
          <QuizSection
            title="Cloud Computing"
            quizzes={quizzes}
            category="Cloud Computing"
          />
        </div>
        <div className="mt-8">
          <QuizSection
            title="Artificial Intelligence"
            quizzes={quizzes}
            category="Artificial Intelligence"
          />
        </div>
        <div className="mt-8">
          <QuizSection
            title="Blockchain"
            quizzes={quizzes}
            category="Blockchain"
          />
        </div>
        <div className="mt-8">
          <QuizSection
            title="Networking"
            quizzes={quizzes}
            category="Networking"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
