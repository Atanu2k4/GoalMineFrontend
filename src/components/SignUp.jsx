import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement your registration logic
    console.log("Sign up attempt with:", formData);

    // Example validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Reset error if validation passes
    setError("");

    // Add registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 relative overflow-hidden">
      {/* Navbar positioned at top middle */}
      <div className="fixed top-0 left-0 right-0 flex justify-center z-50 py-4">
        <Navbar />
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-16">
        <div className="bg-black bg-opacity-70 border border-blue-700 rounded-lg p-8 w-full max-w-md shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-blue-300 mt-2">
              Start your journey with us today
            </p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black mt-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-400 hover:text-blue-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
