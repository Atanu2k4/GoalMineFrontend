import { Link } from "react-router-dom";
import girlImage from "../assets/goal.png";
import Squares from "../components/Squares";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black to-blue-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="#4169e1"
          squareSize={50}
          hoverFillColor="#6495ed"
        />
      </div>

      {/* Navbar positioned at top middle */}
      <div className="fixed top-0 left-0 right-0 flex justify-center z-50 py-4">
        <Navbar />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-12 md:flex-row max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Achieve More With Your Personal AI Goal Assistant
          </h1>
          <p className="text-lg text-white max-w-xl">
            Plan smarter, not harder. Define your goals and let AI break them
            into actionable steps based on your availability.
          </p>
          <div className="pt-4">
            <Link
              to="/app"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Image with Floating Animation */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl max-w-md w-full">
            <img
              src={girlImage}
              alt="Goal visualization"
              className="w-full rounded-lg shadow-inner"
            />
            <div className="absolute -bottom-3 -right-3 bg-black text-blue-300 px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              AI-Powered Planning
            </div>
          </div>
        </div>
      </div>

      {/* Floating Features Section */}
      <div className="relative z-10 pb-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-blue-700 shadow-lg">
            <div className="text-blue-400 text-2xl mb-3">✓ Smart Goals</div>
            <p className="text-white">
              AI-driven analysis to create realistic, achievable goal frameworks
            </p>
          </div>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-blue-700 shadow-lg">
            <div className="text-blue-400 text-2xl mb-3">
              ✓ Adaptive Planning
            </div>
            <p className="text-white">
              Automatically adjusts to your schedule and availability
            </p>
          </div>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-blue-700 shadow-lg">
            <div className="text-blue-400 text-2xl mb-3">
              ✓ Progress Tracking
            </div>
            <p className="text-white">
              Visual dashboards to monitor your journey and celebrate milestones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
