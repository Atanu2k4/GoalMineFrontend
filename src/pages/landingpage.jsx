import { Link } from "react-router-dom";
import girlImage from "../assets/goal.png";
import Squares from "../components/Squares";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black to-blue-900">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 opacity-30">
        <Squares
          direction="diagonal"
          speed={0.6}
          borderColor="#4169e1"
          squareSize={60}
          hoverFillColor="#6495ed"
        />
      </div>

      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-600 filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-56 h-56 rounded-full bg-blue-400 filter blur-3xl opacity-10 animate-pulse delay-700"></div>

      {/* Navbar with subtle glass effect */}
      <div className="fixed top-0 left-0 right-0 flex justify-center z-50 py-4">
        <div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl px-6 shadow-lg">
          <Navbar />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-12 md:flex-row max-w-7xl mx-auto">
        {/* Left Content with enhanced typography */}
        <div className="md:w-1/2 text-center md:text-left space-y-8 mb-12 md:mb-0 md:pr-12">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-blue-900 bg-opacity-70 rounded-full mb-2">
              <span className="text-blue-300 text-sm font-medium tracking-wider">
                AI-POWERED GOAL PLANNING
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Achieve More With Your
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                {" "}
                Personal AI{" "}
              </span>
              Goal Assistant
            </h1>
          </div>
          <p className="text-xl text-blue-100 opacity-90 max-w-xl leading-relaxed">
            Plan smarter, not harder. Define your goals and let AI break them
            into actionable steps based on your availability.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link
              to="/app"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              Get Started
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
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
            <a
              href="#features"
              className="inline-flex items-center justify-center px-6 py-4 bg-transparent border border-blue-500 text-blue-300 rounded-lg text-lg font-medium hover:bg-blue-900 hover:bg-opacity-30 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image with enhanced floating animation and glass effect - badge removed */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl max-w-md w-full rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-blue-600 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl"></div>

            <img
              src={girlImage}
              alt="Goal visualization"
              className="w-full rounded-xl shadow-inner relative z-10"
            />

            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-300 rounded-full"></div>
            <div className="absolute top-1/4 -left-2 w-4 h-4 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section with hover effects */}
      <div id="features" className="relative z-10 pb-24 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Key Features</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm p-8 rounded-xl border border-blue-700 shadow-xl hover:shadow-blue-900/30 transform transition hover:-translate-y-2 group">
            <div className="bg-blue-900 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition">
              <div className="text-blue-400 text-3xl">✓</div>
            </div>
            <h3 className="text-blue-300 text-2xl font-semibold mb-4">
              Smart Goals
            </h3>
            <p className="text-white text-lg">
              AI-driven analysis to create realistic, achievable goal frameworks
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm p-8 rounded-xl border border-blue-700 shadow-xl hover:shadow-blue-900/30 transform transition hover:-translate-y-2 group">
            <div className="bg-blue-900 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition">
              <div className="text-blue-400 text-3xl">✓</div>
            </div>
            <h3 className="text-blue-300 text-2xl font-semibold mb-4">
              Adaptive Planning
            </h3>
            <p className="text-white text-lg">
              Automatically adjusts to your schedule and availability
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm p-8 rounded-xl border border-blue-700 shadow-xl hover:shadow-blue-900/30 transform transition hover:-translate-y-2 group">
            <div className="bg-blue-900 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition">
              <div className="text-blue-400 text-3xl">✓</div>
            </div>
            <h3 className="text-blue-300 text-2xl font-semibold mb-4">
              Progress Tracking
            </h3>
            <p className="text-white text-lg">
              Visual dashboards to monitor your journey and celebrate milestones
            </p>
          </div>
        </div>
      </div>

      {/* Subtle footer with copyright */}
      <div className="relative z-10 pb-6 text-center text-blue-200 opacity-70 text-sm">
        <p>
          © {new Date().getFullYear()} AI Goal Assistant. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
