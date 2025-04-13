import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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

        {/* Auth Buttons or User Profile */}
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-blue-900 hover:bg-opacity-50 rounded-full transition"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {user.displayName?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 border border-blue-700 rounded-lg shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-blue-700">
                    <p className="text-sm text-white font-medium truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-white hover:bg-blue-900 hover:bg-opacity-50 transition flex items-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
