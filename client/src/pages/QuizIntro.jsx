import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ProfileHero from "../components/ProfileHero";

const QuizIntro = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const { quizId } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchQuiz = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${quizId}`
          );
          const data = await response.json();
          setQuiz(data.quiz);
        } catch (error) {
          console.error("Error fetching quiz:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuiz();
    }
  }, [quizId]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${quizId}/start`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-teal-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProfileHero title={quiz.title} desc={quiz.description} />
      <div className="mx-4 md:mx-16 lg:mx-32 my-10">
        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-semibold">
            General Instructions:
          </h3>
          <ul className="list-disc ml-4 md:ml-6 mt-2">
            <li>Read each question carefully before answering.</li>
            <li>There is no time limit for this quiz.</li>
            <li>You can only select one option per question.</li>
            <li>Your score will be displayed at the end of the quiz.</li>
            <li>Make sure to review your answers before submitting.</li>
          </ul>
        </div>
        <Btn text="Start Quiz" onClick={handleStartQuiz} />
      </div>
    </div>
  );
};

export default QuizIntro;

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
