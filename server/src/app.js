import express from "express";
import { config } from "dotenv";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";
import quizResultRoutes from "./routes/quizResultRoutes.js";

export const app = express();
config();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(
  cors({
    origin: frontendUrl,
  })
);
// app.use(cors());

app.use("/api/quizzes", quizRoutes);
app.use("/api/results", quizResultRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "BrainChick Backend",
  });
});
