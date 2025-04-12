// pages/GoalApp.jsx
import { useState } from 'react';
import GoalInput from '../components/GoalInput';
import AvailabilityForm from '../components/AvailabilityForm';
import PlanViewer from '../components/PlanViewer';
import CalendarSyncButton from '../components/CalendarSyncButton';

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
    <div className="max-w-2xl mx-auto mt-10 p-6 shadow rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">AI Goal Assistant</h1>
      <GoalInput goal={goal} setGoal={setGoal} />
      <AvailabilityForm
        hoursPerDay={hoursPerDay}
        setHoursPerDay={setHoursPerDay}
        timeSlot={timeSlot}
        setTimeSlot={setTimeSlot}
      />
      <button
        onClick={handleGeneratePlan}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-4"
      >
        Generate Plan
      </button>
      {plan.length > 0 && (
        <>
          <PlanViewer plan={plan} />
          <CalendarSyncButton onClick={() => alert("Sync logic will go here")} />
        </>
      )}
    </div>
  );
}

export default GoalApp;
