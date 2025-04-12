// pages/GoalApp.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import GoalInput from "../components/GoalInput";
import AvailabilityForm from "../components/AvailabilityForm";
import PlanViewer from "../components/PlanViewer";
import CalendarSyncButton from "../components/CalendarSyncButton";
import Squares from "../components/Squares"; // Import the Squares component

const API_BASE_URL = "http://127.0.0.1:8000";

function GoalApp() {
  const [goal, setGoal] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [timeSlot, setTimeSlot] = useState({ start: "", end: "" });
  const [plan, setPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeneratePlan = async () => {
    if (!goal || !hoursPerDay || !timeSlot.start || !timeSlot.end) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ goal, hoursPerDay, timeSlot }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate plan");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setPlan(data.plan);
    } catch (error) {
      console.error("Error generating plan:", error);
      setError(error.message || "Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!goal || !hoursPerDay || !timeSlot.start || !timeSlot.end) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-plan-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal, hoursPerDay, timeSlot }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "study_plan.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setError(error.message || "Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          GoalAssist
        </Link>
        <Link to="/" className="text-white hover:text-blue-200 transition">
          Back to Home
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
            {error && (
              <div className="bg-red-900 bg-opacity-50 border border-red-700 text-white p-3 rounded-lg">
                {error}
              </div>
            )}

            <GoalInput goal={goal} setGoal={setGoal} />

            <AvailabilityForm
              hoursPerDay={hoursPerDay}
              setHoursPerDay={setHoursPerDay}
              timeSlot={timeSlot}
              setTimeSlot={setTimeSlot}
            />

            <button
              onClick={handleGeneratePlan}
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1 font-medium flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Generate Plan"
              )}
            </button>

            {plan.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-blue-800">
                <PlanViewer plan={plan} />

                <div className="flex flex-col md:flex-row gap-4">
                  <CalendarSyncButton
                    onClick={() => alert("Sync logic will go here")}
                  />

                  <button
                    onClick={handleDownloadPDF}
                    disabled={isLoading}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center md:flex-1 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
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
