import { Link } from 'react-router-dom';
import girlImage from '../assets/goal.png';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-12 md:flex-row">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Achieve More With Your Personal AI Goal Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Plan smarter, not harder. Define your goals and let AI break them into actionable steps based on your availability.
        </p>
        <Link
          to="/app"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={girlImage}
          alt="Goal picture"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
}

export default LandingPage;
