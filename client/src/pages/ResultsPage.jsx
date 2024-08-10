import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileHero from "../components/ProfileHero";

const ResultsPage = () => {
  const { state } = useLocation();
  const { quiz, userAnswers } = state;
  const navigate = useNavigate();
  const [resultId, setResultId] = useState(null);

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();

  const saveResultToMongoDB = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId: quiz.id,
            quizTitle: quiz.title,
            userAnswers,
            score,
            totalQuestions: quiz.questions.length,
          }),
        }
      );

      if (response.ok) {
        const resultData = await response.json();
        const resultId = resultData.resultId;
        setResultId(resultId);
      } else {
        console.error("Failed to save result");
      }
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  useEffect(() => {
    saveResultToMongoDB();
  }, []);

  return (
    <div className="min-h-screen">
      <ProfileHero title="Results" />
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-10">
        <p className="text-lg mb-4">
          You scored {score} out of {quiz.questions.length}.
        </p>
        {resultId && (
          <p className="text-sm text-gray-600 mb-4 break-words">
            <strong>Result ID:</strong> {resultId}
          </p>
        )}
        <Btn text="Back to Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default ResultsPage;

const Btn = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="uppercase py-2 px-4 rounded-lg font-semibold flex justify-center bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {text}
    </button>
  );
};
