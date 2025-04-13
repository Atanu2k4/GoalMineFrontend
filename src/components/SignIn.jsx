import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleSignIn } from "../firebase";
import Navbar from "./Navbar";
import Squares from "./Squares";

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const { user, token } = await googleSignIn();

      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          token: token,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
        navigate("/app");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="#4169e1"
          squareSize={50}
          hoverFillColor="#6495ed"
        />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 flex justify-center z-50 py-4">
        <Navbar />
      </div>

      {/* Sign In Form */}
      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <div className="bg-black bg-opacity-70 border border-blue-700 rounded-lg p-8 w-full max-w-md shadow-xl relative z-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-blue-300 mt-2">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Sign in with Google
              </div>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-white">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
