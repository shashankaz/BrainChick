import express from "express";
import { config } from "dotenv";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";
import quizResultRoutes from "./routes/quizResultRoutes.js";

export const app = express();
config();

app.use(express.json());
app.use(cors());

app.use("/api/quizzes", quizRoutes);
app.use("/api/results", quizResultRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "BrainChick Backend",
  });
});
