import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);

export default router;
