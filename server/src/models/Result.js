import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    quizId: Number,
    quizTitle: String,
    userAnswers: Object,
    score: Number,
    totalQuestions: Number,
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
