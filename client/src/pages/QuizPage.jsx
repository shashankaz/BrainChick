import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ProfileHero from "../components/ProfileHero";

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const { quizId } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchQuiz = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${quizId}`
          );
          const data = await response.json();
          setQuiz(data.quiz);
        } catch (err) {
          console.error("Error fetching quiz:", err);
        }
      };

      fetchQuiz();
    }
  }, [quizId, user, navigate]);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmit = () => {
    navigate("/results", { state: { quiz, userAnswers } });
  };

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div className="min-h-screen">
      <ProfileHero title={quiz.title} desc={quiz.description} />
      <form
        className="mx-4 md:mx-16 lg:mx-32 my-10"
        onSubmit={(e) => e.preventDefault()}
      >
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg md:text-xl font-medium mb-2">
              {index + 1}. {question.question}
            </h2>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <Btn text="Submit Quiz" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default QuizPage;

const Btn = ({ text, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="uppercase py-2 px-4 md:px-6 rounded-lg font-semibold flex justify-center bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out cursor-pointer"
  >
    {text}
  </button>
);
