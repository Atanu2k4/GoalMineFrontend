import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement your authentication logic
    console.log("Sign in attempt with:", { email, password });

    // Example validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Reset error if validation passes
    setError("");

    // Add authentication call here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 relative overflow-hidden">
      {/* Navbar positioned at top middle */}
      <div className="fixed top-0 left-0 right-0 flex justify-center z-50 py-4">
        <Navbar />
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-black bg-opacity-70 border border-blue-700 rounded-lg p-8 w-full max-w-md shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-blue-300 mt-2">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-white">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300">
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
