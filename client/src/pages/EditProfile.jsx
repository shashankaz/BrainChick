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
      <div className="flex flex-col items-center justify-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-10">
        <form onSubmit={handleUpdateProfile} className="w-full max-w-lg">
          <div className="mb-4">
            <label className="block font-bold mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Contact Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between gap-8 mt-4">
            <Btn text={"Save Changes"} />
            <Btn text={"Cancel"} onClick={() => navigate("/profile")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

const Btn = ({ text, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="py-2 px-4 w-full md:w-auto rounded-lg font-semibold flex justify-center bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out cursor-pointer mb-4 md:mb-0"
  >
    {text}
  </button>
);
