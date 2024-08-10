import React, { useState } from "react";
import axios from "axios";
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = [...formValues.questions];
    newQuestions[index][name] = value;
    setFormValues({ ...formValues, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { value } = e.target;
    const newQuestions = [...formValues.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setFormValues({ ...formValues, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormValues({
      ...formValues,
      questions: [
        ...formValues.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.title) newErrors.title = "Title is required";
    if (!formValues.description)
      newErrors.description = "Description is required";
    if (!formValues.category) newErrors.category = "Category is required";
    if (!formValues.difficulty) newErrors.difficulty = "Difficulty is required";

    formValues.questions.forEach((question, qIndex) => {
      if (!question.question)
        newErrors[`question-${qIndex}`] = "Question is required";
      question.options.forEach((option, oIndex) => {
        if (!option)
          newErrors[`option-${qIndex}-${oIndex}`] = "Option is required";
      });
      if (!question.correctAnswer)
        newErrors[`correctAnswer-${qIndex}`] = "Correct answer is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/quizzes",
        formValues
      );
      console.log(response.data);
      alert("Quiz created successfully!");
      navigate("/"); // Redirect to another page if needed
    } catch (error) {
      console.error("There was an error creating the quiz!", error);
      alert("Failed to create the quiz. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <ProfileHero
        title="Create a Quiz"
        desc="Fill out the form below to create a new quiz."
      />
      <div className="mx-32 my-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-4 w-1/2 mx-auto"
        >
          <label htmlFor="title">Quiz Title*</label>
          <input
            type="text"
            placeholder="Enter quiz title"
            id="title"
            name="title"
            className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 bg-white text-black"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}

          <label htmlFor="description" className="mt-4">
            Description*
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
          {errors.description && (
            <p className="text-red-600 mt-1">{errors.description}</p>
          )}

          <label htmlFor="category" className="mt-4">
            Category*
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
          {errors.category && (
            <p className="text-red-600 mt-1">{errors.category}</p>
          )}

          <label htmlFor="difficulty" className="mt-4">
            Difficulty*
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
          {errors.difficulty && (
            <p className="text-red-600 mt-1">{errors.difficulty}</p>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Questions:</h3>
            {formValues.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="border border-gray-500 p-4 rounded-md mt-4 flex flex-col"
              >
                <label htmlFor={`question-${qIndex}`}>
                  Question {qIndex + 1}*
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
                {errors[`question-${qIndex}`] && (
                  <p className="text-red-600 mt-1">
                    {errors[`question-${qIndex}`]}
                  </p>
                )}

                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="mt-4">
                    <label htmlFor={`option-${qIndex}-${oIndex}`}>
                      Option {oIndex + 1}*
                    </label>
                    <input
                      type="text"
                      placeholder="Enter option"
                      id={`option-${qIndex}-${oIndex}`}
                      className="bg-transparent border border-gray-500 p-2 rounded-md mt-1 ml-4 bg-white text-black"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                    />
                    {errors[`option-${qIndex}-${oIndex}`] && (
                      <p className="text-red-600 mt-1">
                        {errors[`option-${qIndex}-${oIndex}`]}
                      </p>
                    )}
                  </div>
                ))}

                <label htmlFor={`correctAnswer-${qIndex}`} className="mt-4">
                  Correct Answer*
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
                {errors[`correctAnswer-${qIndex}`] && (
                  <p className="text-red-600 mt-1">
                    {errors[`correctAnswer-${qIndex}`]}
                  </p>
                )}
              </div>
            ))}
          </div>

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
