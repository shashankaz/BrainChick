import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import { handleErrors } from "../utils/helpers.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, questions } = req.body;

    const questionDocs = await Question.insertMany(questions);

    const newQuiz = new Quiz({
      title,
      description,
      category,
      difficulty,
      questions: questionDocs.map((q) => q._id),
    });

    await newQuiz.save();
    res
      .status(201)
      .json({ success: "true", message: "Quiz created successfully", newQuiz });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      success: "true",
      message: "Quizzes fetched successfully",
      quizzes,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");

    if (!quiz) {
      return res
        .status(404)
        .json({ success: "false", message: "Quiz not found" });
    }

    res.status(200).json({
      success: "true",
      message: "Quiz fetched successfully",
      quiz,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
