import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ProfileHero from "../components/ProfileHero";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchScores = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/results`
        );
        const data = await response.json();

        const sortedScores = data.results
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        setScores(sortedScores);
      };

      fetchScores();
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <ProfileHero title={"Leaderboard"} />
      <div className="mx-4 md:mx-16 lg:mx-32 my-10">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse bg-slate-800 rounded-lg">
            <thead>
              <tr className="text-left bg-slate-700 text-teal-400">
                <th className="border-b border-slate-600 p-3 sm:p-4">Rank</th>
                <th className="border-b border-slate-600 p-3 sm:p-4">Name</th>
                <th className="border-b border-slate-600 p-3 sm:p-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr
                  key={index}
                  className={`hover:bg-slate-700 ${
                    index % 2 === 0 ? "bg-slate-800" : "bg-slate-900"
                  }`}
                >
                  <td className="border-b border-slate-600 p-3 sm:p-4">
                    {index + 1}
                  </td>
                  <td className="border-b border-slate-600 p-3 sm:p-4">
                    {score.name}
                  </td>
                  <td className="border-b border-slate-600 p-3 sm:p-4">
                    {score.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
