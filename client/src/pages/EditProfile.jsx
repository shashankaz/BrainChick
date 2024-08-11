import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import ProfileHero from "../components/ProfileHero";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateProfile(user, {
          displayName: displayName,
          phoneNumber: phoneNumber,
        });
        if (email !== user.email) {
          await user.updateEmail(email);
        }
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="min-h-screen">
      <ProfileHero title={"Edit Profile"} />
      <div className="sm:max-w-lg mx-4 sm:mx-auto bg-slate-800 rounded-lg p-6 sm:p-8 my-10">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-300"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 p-2 sm:p-3 w-full bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 sm:p-3 w-full bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-300"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 p-2 sm:p-3 w-full bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md py-2 sm:py-3 px-4 sm:px-6 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md py-2 sm:py-3 px-4 sm:px-6 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
