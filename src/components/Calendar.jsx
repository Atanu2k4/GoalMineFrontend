import { useState, useEffect, useMemo } from "react";

export default function Calendar({ plan }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get calendar data for current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    return { daysInMonth, firstDayOfMonth };
  };

  // Get tasks for selected date function needs to be updated
  const getTasksForDate = (date) => {
    if (!plan || !Array.isArray(plan)) return [];

    // Parse the plan dates and tasks
    const tasks = [];
    let dayCounter = 1;

    // Get current date to calculate relative dates
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    for (let i = 0; i < plan.length; i++) {
      const item = plan[i];
      if (item.includes("Day")) {
        // Calculate the plan date starting from today
        const planDate = new Date(startDate);
        planDate.setDate(planDate.getDate() + (dayCounter - 1));

        // Get the next items for topics and time
        const topics = plan[i + 1]?.includes("Topics:") ? plan[i + 1] : "";
        const time = plan[i + 2]?.includes("Time Allotted:") ? plan[i + 2] : "";

        tasks.push({
          date: planDate,
          topics,
          time,
        });

        dayCounter++;
      }
    }

    // Compare dates using only year, month, and day
    const selectedTasks = tasks.filter((task) => {
      return (
        task.date.getFullYear() === date.getFullYear() &&
        task.date.getMonth() === date.getMonth() &&
        task.date.getDate() === date.getDate()
      );
    });

    return selectedTasks.map((task) => `${task.topics}\n${task.time}`);
  };

  // Navigate between months
  const changeMonth = (offset) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="bg-black bg-opacity-70 rounded-lg border border-blue-700 p-6 mt-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 text-white hover:bg-blue-600 rounded-lg"
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-white">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 text-white hover:bg-blue-600 rounded-lg"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-blue-400 font-medium p-2">
            {day}
          </div>
        ))}

        {/* Blank spaces */}
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="p-4" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const hasTask = getTasksForDate(date).length > 0;
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(date)}
              className={`p-4 rounded-lg text-center relative transition-all
                ${hasTask ? "border border-blue-500" : ""}
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-blue-900 hover:bg-opacity-50"
                }
              `}
            >
              {day}
              {hasTask && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tasks for selected date */}
      {selectedDate && (
        <div className="mt-6 border-t border-blue-700 pt-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Tasks for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
          <div className="space-y-4">
            {getTasksForDate(selectedDate).map((task, index) => {
              const timeMatch = task.match(/Time Allotted: (.+)/);
              const topicsMatch = task.match(/Topics: (.+)/);

              return (
                <div
                  key={index}
                  className="bg-blue-900 bg-opacity-30 rounded-lg p-4"
                >
                  {topicsMatch && (
                    <div className="text-white font-medium mb-2">
                      {topicsMatch[1]}
                    </div>
                  )}
                  {timeMatch && (
                    <div className="text-blue-300">{timeMatch[1]}</div>
                  )}
                </div>
              );
            })}
            {getTasksForDate(selectedDate).length === 0 && (
              <p className="text-gray-400">No tasks scheduled for this date</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
