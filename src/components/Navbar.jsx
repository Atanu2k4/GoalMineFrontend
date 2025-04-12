import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black bg-opacity-75 backdrop-blur-md border border-blue-700 rounded-full shadow-lg shadow-blue-900/30">
      <div className="flex items-center justify-between px-3 py-2">
        {/* Navigation Links */}
        <div className="flex space-x-1">
          <Link
            to="/"
            className="px-4 py-2 text-white hover:bg-blue-900 hover:bg-opacity-50 rounded-full transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 text-white hover:bg-blue-900 hover:bg-opacity-50 rounded-full transition"
          >
            Team
          </Link>
        </div>

        {/* Logo in center */}
        <div className="flex items-center mx-4">
          <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-2">
          <Link
            to="/signin"
            className="px-4 py-2 text-white hover:bg-blue-900 hover:bg-opacity-50 rounded-full transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
