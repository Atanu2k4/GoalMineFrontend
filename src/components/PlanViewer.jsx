import React, { useMemo } from "react";

export default function PlanViewer({ plan }) {
  const formatPlan = useMemo(() => {
    if (!plan || !Array.isArray(plan)) {
      return [];
    }

    const days = [];
    let currentDay = {
      day: "",
      date: "",
      topics: [],
      timeSlots: [],
    };

    // Helper function to parse date
    const calculateDate = (dayNumber) => {
      const currentDate = new Date();
      const plannedDate = new Date(currentDate);
      plannedDate.setDate(currentDate.getDate() + (parseInt(dayNumber) - 1));

      return plannedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    };

    // Process each line of the plan
    plan.forEach((item) => {
      if (!item) return;

      const cleanItem = item.trim().replace(/["""'']/g, "");

      if (cleanItem.startsWith("Day")) {
        if (currentDay.day) {
          days.push({ ...currentDay });
        }

        const dayMatch = cleanItem.match(/Day\s+(\d+)/);
        const dayNumber = dayMatch ? dayMatch[1] : "";

        currentDay = {
          day: `Day ${dayNumber}`, // Simplified day format
          date: calculateDate(dayNumber),
          topics: [],
          timeSlots: [],
        };
      } else if (cleanItem.startsWith("Topics:")) {
        const topicsList = cleanItem
          .replace("Topics:", "")
          .split(",")
          .map((topic) => topic.trim())
          .filter(Boolean);

        currentDay.topics = topicsList;
      } else if (cleanItem.startsWith("Time Allotted:")) {
        const timeSlot = cleanItem.replace("Time Allotted:", "").trim();
        currentDay.timeSlots.push(timeSlot);
      }
    });

    if (currentDay.day) {
      days.push({ ...currentDay });
    }

    return days;
  }, [plan]);

  if (!plan) {
    return (
      <div className="mt-6 text-center text-white">
        <p className="text-xl">No study plan available yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Your Personalized Study Plan
      </h2>

      {formatPlan.map((day, index) => (
        <div
          key={`day-${index}`}
          className="day-plan p-6 bg-black bg-opacity-40 rounded-lg border border-blue-700 hover:border-blue-500 transition-all"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-4 pb-2 border-b border-blue-700">
            {day.date}
          </h3>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Topics to Study
            </h4>
            <p className="text-white leading-relaxed">
              {day.topics.join(". ")}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Study Schedule
            </h4>
            <div className="text-green-400 font-mono bg-black bg-opacity-30 p-2 rounded">
              {day.timeSlots.join(" ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
