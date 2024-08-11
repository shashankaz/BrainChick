import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProfileHero = ({ title, name, desc }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="bg-gradient-to-r from-teal-900 to-teal-500 px-4 sm:px-8 md:px-16 lg:px-32 h-32 flex flex-col justify-center">
      {user && name && (
        <h4 className="text-lg font-semibold">
          Hi {user.displayName || user.email},
        </h4>
      )}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h1>
      <p className="mt-2 sm:mt-1">{desc}</p>
    </div>
  );
};

export default ProfileHero;
