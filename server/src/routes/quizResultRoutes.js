import express from "express";
import {
  saveQuizResult,
  getAllQuizResults,
  getQuizResultById,
} from "../controllers/quizResultController.js";

const router = express.Router();

router.post("/", saveQuizResult);
router.get("/", getAllQuizResults);
router.get("/:id", getQuizResultById);

export default router;
