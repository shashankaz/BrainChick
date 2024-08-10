import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-10 border-t border-gray-700">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link to={"/"}>
            <span className="text-2xl font-semibold">BrainChick</span>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <Link to={"/"} className="hover:underline">
            About
          </Link>
          <Link to={"/"} className="hover:underline">
            Privacy Policy
          </Link>
          <Link to={"/"} className="hover:underline">
            Terms of Service
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Social</h3>
          <Link to={"/"} className="hover:underline">
            Twitter
          </Link>
          <Link to={"/"} className="hover:underline">
            Facebook
          </Link>
          <Link to={"/"} className="hover:underline">
            Instagram
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="break-words">support@brainchick.com</div>
          <div>+91 9876543210</div>
        </div>
      </div>
      <div className="w-full text-center mt-6">
        <p className="text-sm">
          &copy; {year} BrainChick. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
