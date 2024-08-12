import express from "express";
import {
  saveQuizResult,
  getAllQuizResults,
  getQuizResultById,
  getQuizResultByEmail,
} from "../controllers/quizResultController.js";

const router = express.Router();

router.post("/", saveQuizResult);
router.get("/", getAllQuizResults);
router.get("/id/:id", getQuizResultById);
router.get("/user/:email", getQuizResultByEmail);

export default router;
