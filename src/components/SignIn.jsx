import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Squares from "./Squares";

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault(); // Prevent any default button behavior

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Explicitly create a new GoogleAuthProvider for each sign-in attempt
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/app");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError(
        err.code === "auth/popup-closed-by-user"
          ? "Sign-in cancelled. Please try again."
          : "Failed to sign in with Google. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="#4169e1"
          squareSize={50}
          hoverFillColor="#6495ed"
        />
      </div>

      <div className="fixed top-0 left-0 right-0 flex justify-center z-50 py-4">
        <Navbar />
      </div>

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
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative z-10"
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
                <span>Sign in with Google</span>
              </div>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-white">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 cursor-pointer"
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
