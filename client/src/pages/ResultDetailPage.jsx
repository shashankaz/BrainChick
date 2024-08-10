import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileHero from "../components/ProfileHero";

const ResultDetailPage = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/results/${resultId}`
        );
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    fetchResult();
  }, [resultId]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-lg">
        Result not found
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProfileHero title={`Results for ${result.quizTitle}`} />
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-10">
        <p className="text-lg mb-4">
          You scored {result.score} out of {result.totalQuestions}.
        </p>
        <p className="text-sm text-gray-600 mb-4 break-words">
          <strong>Result ID:</strong> {resultId}
        </p>
        <Btn text="Back to Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default ResultDetailPage;

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
