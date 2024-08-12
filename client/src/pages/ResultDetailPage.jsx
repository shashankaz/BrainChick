import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileHero from "../components/ProfileHero";

const ResultDetailPage = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/results/id/${resultId}`
        );
        const data = await response.json();
        setResult(data.result);
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-teal-400">
        Result not found.
      </div>
    );
  }

  return (
    <div className="md:min-h-screen">
      <ProfileHero
        title={`Results for ${result.quizTitle} of ${result.name}`}
      />
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 mt-10 mb-20">
        {loading ? (
          <p className="text-teal-400 text-xl mt-10">Loading...</p>
        ) : (
          <>
            <p className="text-lg mb-4">
              {result.name} scored {result.score} out of {result.totalQuestions}
              .
            </p>
            <p className="text-sm text-gray-600 mb-4 break-words">
              <strong>Result ID:</strong> {resultId}
            </p>
            <Btn text="Back to Home" onClick={() => navigate("/")} />
          </>
        )}
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
