export default function PlanViewer({ plan }) {
  const formatText = (text) => {
    // Parse the plan data into structured format
    const planItems = Array.isArray(plan) ? plan : [text];
    const days = [];
    let currentDay = {};

    planItems.forEach((item) => {
      if (item.includes("Day")) {
        if (Object.keys(currentDay).length > 0) {
          days.push(currentDay);
        }
        currentDay = { day: item };
      } else if (item.includes("Topics:")) {
        currentDay.topics = item.replace("Topics:", "").trim();
      } else if (item.includes("Time Allotted:")) {
        currentDay.time = item.replace("Time Allotted:", "").trim();
      }
    });
    if (Object.keys(currentDay).length > 0) {
      days.push(currentDay);
    }

    // Format each day's content
    return days
      .map((dayData) => {
        const dayNumber = dayData.day.split(" ")[1];
        const currentDate = new Date();
        const plannedDate = new Date(currentDate);
        plannedDate.setDate(currentDate.getDate() + (parseInt(dayNumber) - 1));

        const formattedDate = plannedDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          weekday: "long",
        });

        // Clean up topics by removing extra spaces and empty items
        const cleanTopics = dayData.topics
          .split(",")
          .map((topic) => topic.trim())
          .filter((topic) => topic.length > 0);

        // Clean up time entries by removing quotes and extra spaces
        const cleanTimes = dayData.time
          .split(";")
          .map((time) => time.trim().replace(/["']/g, ""))
          .filter((time) => time.length > 0);

        return `
        <div class="day-plan mb-6">
          <h3 class="text-2xl font-bold text-blue-400 mb-4 border-b border-blue-700 pb-2">
            Day ${dayNumber}: ${formattedDate}
          </h3>

          <div class="mb-4">
            <h4 class="text-lg font-semibold text-blue-300 mb-2">Topics to Study:</h4>
            <ul class="list-disc list-inside space-y-1 text-white pl-4">
              ${cleanTopics
                .map((topic) => `<li class="mb-2">${topic}</li>`)
                .join("")}
            </ul>
          </div>

          <div class="mb-4">
            <h4 class="text-lg font-semibold text-blue-300 mb-2">Study Schedule:</h4>
            <div class="pl-4 space-y-2">
              ${cleanTimes
                .map(
                  (time) =>
                    `<div class="flex items-center">
                    <span class="text-green-400 font-mono">${time}</span>
                  </div>`
                )
                .join("")}
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Study Plan</h2>
      <div className="space-y-4">
        <div className="bg-black bg-opacity-40 rounded-lg p-6 border border-blue-700">
          <div dangerouslySetInnerHTML={{ __html: formatText(plan) }} />
        </div>
      </div>
    </div>
  );
}
