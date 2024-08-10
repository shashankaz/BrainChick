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

        console.log(data);
        setScores(sortedScores);
      };

      fetchScores();
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <ProfileHero title={"Leaderboard"} />
      <div className="mx-4 md:mx-16 lg:mx-32 my-10">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="border border-gray-300 p-2 sm:p-4">Rank</th>
                <th className="border border-gray-300 p-2 sm:p-4">ID</th>
                <th className="border border-gray-300 p-2 sm:p-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 sm:p-4">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-4">
                    {score._id}
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-4">
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
