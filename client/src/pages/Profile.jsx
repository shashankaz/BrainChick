import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ProfileHero from "../components/ProfileHero";

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [scores, setScores] = useState([]);
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchScores = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/results/user/${user.email}`
          );
          const data = await response.json();
          setScores(data.result);
        } catch (error) {
          console.error("Error fetching scores:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchScores();
    }
  }, [user, navigate]);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-teal-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {user && (
        <div>
          <ProfileHero title="Profile" />
          <div className="my-10 mx-4 sm:mx-8 md:mx-16 lg:mx-32">
            <div className="bg-slate-800 rounded-lg shadow-lg p-4">
              <div className="flex border-b border-slate-700">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === "info"
                      ? "text-teal-400 border-teal-400 border-b-2"
                      : "text-white"
                  } hover:text-teal-400`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab("performance")}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === "performance"
                      ? "text-teal-400 border-teal-400 border-b-2"
                      : "text-white"
                  } hover:text-teal-400`}
                >
                  User Performance
                </button>
              </div>

              {activeTab === "info" && (
                <div className="py-4">
                  <table className="table-auto w-full">
                    <tbody>
                      <tr>
                        <td className="border-b border-slate-700 p-4 font-semibold text-teal-400">
                          Account Name
                        </td>
                        <td className="border-b border-slate-700 p-4">
                          {user.displayName || "Unavailable"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-slate-700 p-4 font-semibold text-teal-400">
                          Email
                        </td>
                        <td className="border-b border-slate-700 p-4">
                          {user.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-slate-700 p-4 font-semibold text-teal-400">
                          Contact Number
                        </td>
                        <td className="border-b border-slate-700 p-4">
                          {user.phoneNumber || "Unavailable"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-8 flex gap-4">
                    <Btn text="Edit Profile" onClick={handleEditProfile} />
                    <Btn text="Logout" onClick={handleLogout} />
                  </div>
                </div>
              )}

              {activeTab === "performance" && (
                <div className="py-4">
                  {scores.length === 0 ? (
                    <p className="text-center text-gray-400 mt-3">
                      No performance data available.
                    </p>
                  ) : (
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="bg-slate-700 text-teal-400">
                          <th className="border-b border-slate-600 p-3 sm:p-4">
                            No.
                          </th>
                          <th className="border-b border-slate-600 p-3 sm:p-4">
                            Quiz Name
                          </th>
                          <th className="border-b border-slate-600 p-3 sm:p-4">
                            Score
                          </th>
                          <th className="border-b border-slate-600 p-3 sm:p-4">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scores.map((score, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-slate-700 text-center ${
                              index % 2 === 0 ? "bg-slate-800" : "bg-slate-900"
                            }`}
                          >
                            <td className="border-b border-slate-600 p-3 sm:p-4">
                              {index + 1}
                            </td>
                            <td className="border-b border-slate-600 p-3 sm:p-4">
                              {score.quizTitle}
                            </td>
                            <td className="border-b border-slate-600 p-3 sm:p-4">
                              {score.score}
                            </td>
                            <td className="border-b border-slate-600 p-3 sm:p-4">
                              {new Date(score.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

const Btn = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="uppercase py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out cursor-pointer text-sm sm:text-base"
    >
      {text}
    </button>
  );
};
