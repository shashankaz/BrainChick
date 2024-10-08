import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileHero from "../components/ProfileHero";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ResultsPage = () => {
  const { state } = useLocation();
  const { quiz, userAnswers } = state;
  const navigate = useNavigate();
  const [resultId, setResultId] = useState(null);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

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
            name: user.displayName,
            email: user.email,
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
        setError("Failed to save result.");
      }
    } catch (error) {
      setError("Error saving result. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShareClick = () => {
    if (resultId) {
      const shareUrl = `${window.location.origin}/results/${resultId}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess("Link copied!");
        setTimeout(() => setCopySuccess(""), 3000);
      });
    }
  };

  useEffect(() => {
    saveResultToMongoDB();
  }, []);

  return (
    <div className="min-h-screen">
      <ProfileHero title="Results" />
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-10">
        {loading ? (
          <p className="text-teal-400 text-xl">Saving your result...</p>
        ) : error ? (
          <p className="text-red-500 text-xl">{error}</p>
        ) : (
          <>
            <p className="text-lg mb-4">
              You scored {score} out of {quiz.questions.length}.
            </p>
            {resultId && (
              <p className="text-sm text-gray-600 mb-4 break-words">
                <strong>Result ID:</strong> {resultId}
              </p>
            )}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Your Answers:</h3>
              {quiz.questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <p className="font-medium mb-2">
                    Q{index + 1}: {question.question}
                  </p>
                  <p className="text-sm">
                    <strong>Your Answer:</strong>{" "}
                    <span
                      className={
                        userAnswers[index] === question.correctAnswer
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {userAnswers[index]}
                    </span>
                  </p>
                  <p className="text-sm">
                    <strong>Correct Answer:</strong>{" "}
                    <span className="text-green-600">
                      {question.correctAnswer}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <Btn text="Back to Home" onClick={() => navigate("/")} />
              <Btn
                text="Leaderboard"
                onClick={() => navigate("/leaderboard")}
              />
              {resultId && (
                <Btn text={copySuccess || "Share"} onClick={handleShareClick} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;

const Btn = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="uppercase py-2 px-4 rounded-lg text-sm sm:text-base font-semibold flex justify-center bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {text}
    </button>
  );
};
