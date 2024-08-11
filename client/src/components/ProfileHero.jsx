import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProfileHero = ({ title, name, desc }) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className="relative px-4 sm:px-8 md:px-16 lg:px-32 py-10 flex flex-col justify-center"
      style={{
        background: `linear-gradient(to bottom right, rgba(0, 128, 128, 0.8), rgba(0, 64, 64, 0.8))`,
      }}
    >
      {user && name && (
        <h4 className="text-md sm:text-lg font-medium mb-2">
          Hi {user.displayName || user.email},
        </h4>
      )}
      <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
        {title}
      </h1>
      {desc && (
        <p className="mt-3 sm:mt-2 text-sm sm:text-base lg:text-lg text-teal-100">
          {desc}
        </p>
      )}
    </div>
  );
};

export default ProfileHero;
