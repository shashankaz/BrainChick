import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ProfileHero from "../components/ProfileHero";

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen">
      {user ? (
        <div>
          <ProfileHero title={"Profile"} />
          <div className="my-10 mx-4 md:mx-16 lg:mx-32">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 sm:p-4 font-semibold">
                    Account Name
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-4">
                    {user.displayName}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 sm:p-4 font-semibold">
                    Email
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-4">
                    {user.email}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 sm:p-4 font-semibold">
                    Contact Number
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-4">
                    {user.phoneNumber || "unavailable"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Btn text="Edit Profile" />
              <Btn text="Logout" onClick={handleLogout} />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
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
      className="uppercase py-2 px-4 rounded-lg font-semibold flex justify-center bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {text}
    </button>
  );
};
