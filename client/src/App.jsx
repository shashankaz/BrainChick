import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Loading from "./components/Loading";
const Quizzes = lazy(() => import("./pages/Quizzes"));
const QuizIntro = lazy(() => import("./pages/QuizIntro"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const QuizForm = lazy(() => import("./pages/QuizForm"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const ResultDetailPage = lazy(() => import("./pages/ResultDetailPage"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <div className="bg-slate-900 text-white">
      <Suspense fallback={<Loading />}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quiz/:quizId" element={<QuizIntro />} />
            <Route path="/quiz/:quizId/start" element={<QuizPage />} />
            <Route path="/create" element={<QuizForm />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/results/:resultId" element={<ResultDetailPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
      <Analytics />
    </div>
  );
};

export default App;
