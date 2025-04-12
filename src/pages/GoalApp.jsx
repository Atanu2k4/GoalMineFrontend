// pages/GoalApp.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import GoalInput from "../components/GoalInput";
import AvailabilityForm from "../components/AvailabilityForm";
import PlanViewer from "../components/PlanViewer";
import CalendarSyncButton from "../components/CalendarSyncButton";
import Squares from "../components/Squares"; // Import the Squares component

function GoalApp() {
  const [goal, setGoal] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [timeSlot, setTimeSlot] = useState({ start: "", end: "" });
  const [plan, setPlan] = useState([]);

  const handleGeneratePlan = async () => {
    console.log("Goal:", goal);
    console.log("Hours/Day:", hoursPerDay);
    console.log("Time Interval:", timeSlot);
    const dummyPlan = [
      "Day 1: Learn syntax",
      "Day 2: Data types",
      "Day 3: Functions",
    ];
    setPlan(dummyPlan);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-black to-blue-900 py-16 px-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-10">
        <Squares
          direction="right"
          speed={0.3}
          borderColor="#4169e1"
          squareSize={50}
          hoverFillColor="#6495ed"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
        <Link to="/" className="text-white text-xl font-bold flex items-center">
          <span className="bg-blue-600 rounded-full p-1 mr-2">
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
          </span>
          GoalMineAI
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-black bg-opacity-70 rounded-xl shadow-2xl overflow-hidden border border-blue-800">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4">
            <h1 className="text-2xl font-bold text-center text-white">
              AI Goal Assistant
            </h1>
          </div>

          <div className="p-6 space-y-6">
            <GoalInput goal={goal} setGoal={setGoal} />

            <AvailabilityForm
              hoursPerDay={hoursPerDay}
              setHoursPerDay={setHoursPerDay}
              timeSlot={timeSlot}
              setTimeSlot={setTimeSlot}
            />

            <button
              onClick={handleGeneratePlan}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1 font-medium"
            >
              Generate Plan
            </button>

            {plan.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-blue-800">
                <PlanViewer plan={plan} />
                <CalendarSyncButton
                  onClick={() => alert("Sync logic will go here")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-black bg-opacity-50 p-5 rounded-lg border border-blue-700">
          <h3 className="text-white font-medium mb-2">Pro Tips:</h3>
          <ul className="text-white text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-blue-300 mr-2">•</span>
              Be specific with your goal description for better results
            </li>
            <li className="flex items-start">
              <span className="text-blue-300 mr-2">•</span>
              Set realistic daily hours based on your energy levels
            </li>
            <li className="flex items-start">
              <span className="text-blue-300 mr-2">•</span>
              Sync with your calendar to avoid scheduling conflicts
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GoalApp;
