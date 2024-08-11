import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHero from "../components/ProfileHero";

const QuizForm = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Easy",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
  });

  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();
  const HARDCODED_SECRET_KEY = "mySecret123";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (qIndex, e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      const questions = [...prev.questions];
      questions[qIndex][name] = value;
      return { ...prev, questions };
    });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { value } = e.target;
    setFormValues((prev) => {
      const questions = [...prev.questions];
      questions[qIndex].options[oIndex] = value;
      return { ...prev, questions };
    });
  };

  const addQuestion = () => {
    setFormValues((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (secretKey !== HARDCODED_SECRET_KEY) {
      alert("Invalid secret key! You cannot create a quiz.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        alert("Quiz created successfully!");
        navigate("/");
      } else {
        alert("Failed to create the quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error creating the quiz:", error);
      alert("Failed to create the quiz. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <ProfileHero
        title="Create a Quiz"
        desc="Fill out the form below to create a new quiz."
      />
      <div className="mx-4 my-10 sm:mx-8 md:mx-16 lg:mx-32">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-4 w-full md:w-2/3 lg:w-1/2 mx-auto"
        >
          <label htmlFor="title">Quiz Title</label>
          <input
            type="text"
            placeholder="Enter quiz title"
            id="title"
            name="title"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 bg-white text-black"
            value={formValues.title}
            onChange={handleChange}
          />

          <label htmlFor="description" className="mt-4">
            Description
          </label>
          <textarea
            placeholder="Enter quiz description"
            id="description"
            name="description"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 bg-white text-black"
            rows="3"
            value={formValues.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="category" className="mt-4">
            Category
          </label>
          <input
            type="text"
            placeholder="Enter quiz category"
            id="category"
            name="category"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 bg-white text-black"
            value={formValues.category}
            onChange={handleChange}
          />

          <label htmlFor="difficulty" className="mt-4">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 bg-white text-black"
            value={formValues.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Hard">Hard</option>
          </select>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Questions:</h3>
            {formValues.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="border border-gray-500 p-4 rounded-md mt-4 flex flex-col"
              >
                <label htmlFor={`question-${qIndex}`}>
                  Question {qIndex + 1}
                </label>
                <input
                  type="text"
                  placeholder="Enter question"
                  id={`question-${qIndex}`}
                  name="question"
                  className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 bg-white text-black"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                />

                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="mt-4">
                    <label htmlFor={`option-${qIndex}-${oIndex}`}>
                      Option {oIndex + 1}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter option"
                      id={`option-${qIndex}-${oIndex}`}
                      className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 ml-4 bg-white text-black"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                    />
                  </div>
                ))}

                <label htmlFor={`correctAnswer-${qIndex}`} className="mt-4">
                  Correct Answer
                </label>
                <select
                  id={`correctAnswer-${qIndex}`}
                  name="correctAnswer"
                  className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 text-black bg-white"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                >
                  <option value="">Select correct answer</option>
                  {question.options.map((option, oIndex) => (
                    <option key={oIndex} value={option}>
                      Option {oIndex + 1}: {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <label htmlFor="secretKey" className="mt-4">
            Secret Key
          </label>
          <input
            type="password"
            placeholder="Enter secret key"
            id="secretKey"
            name="secretKey"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 bg-white text-black"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />

          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-600 mt-8 uppercase rounded-md py-3 font-semibold"
          >
            Add Another Question
          </button>

          <button
            type="submit"
            className="bg-teal-600 mt-8 uppercase rounded-md py-3 font-semibold"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
