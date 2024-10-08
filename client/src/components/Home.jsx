import React, { useState, useEffect } from "react";
import ProfileHero from "./ProfileHero";
import QuizSection from "./QuizSection";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Cover from "./Cover";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

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

  return (
    <div className="min-h-screen">
      {user ? (
        <ProfileHero title={"Welcome to BrainChick"} name={true} />
      ) : (
        <Cover />
      )}
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-6 sm:py-10">
        {loading ? (
          <p className="text-center text-teal-400 p-4">Loading...</p>
        ) : (
          <>
            <QuizSection
              title="Web Development"
              quizzes={quizzes}
              category="Web Development"
            />
            <div className="my-6">
              <QuizSection
                title="Programming"
                quizzes={quizzes}
                category="Programming"
              />
            </div>
            <div className="my-6">
              <QuizSection
                title="Database"
                quizzes={quizzes}
                category="Database"
              />
            </div>
            <div className="my-6">
              <QuizSection
                title="Cybersecurity"
                quizzes={quizzes}
                category="Cybersecurity"
              />
            </div>
            <div className="my-6">
              <QuizSection
                title="Cloud Computing"
                quizzes={quizzes}
                category="Cloud Computing"
              />
            </div>
            <div className="my-6">
              <QuizSection
                title="Artificial Intelligence"
                quizzes={quizzes}
                category="Artificial Intelligence"
              />
            </div>
            <div className="my-6">
              <QuizSection
                title="Blockchain"
                quizzes={quizzes}
                category="Blockchain"
              />
            </div>
            <div className="my-6">
              <QuizSection
                title="Networking"
                quizzes={quizzes}
                category="Networking"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
