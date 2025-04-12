export default function PlanViewer({ plan }) {
  const formatText = (text) => {
    const planItems = Array.isArray(plan) ? plan : [text];
    const days = [];
    let currentDay = {};

    planItems.forEach((item) => {
      const cleanItem = item.replace(/["""'']/g, "").trim();

      if (cleanItem.includes("Day")) {
        if (Object.keys(currentDay).length > 0) {
          days.push(currentDay);
        }
        currentDay = { day: cleanItem };
      } else if (cleanItem.includes("Topics:")) {
        currentDay.topics = cleanItem
          .replace("Topics:", "")
          .replace(/\s+/g, " ")
          .trim();
      } else if (cleanItem.includes("Time Allotted:")) {
        currentDay.time = cleanItem.replace("Time Allotted:", "").trim();
      }
    });

    if (Object.keys(currentDay).length > 0) {
      days.push(currentDay);
    }

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

        const topicsText = dayData.topics
          .replace(/\s*\(\s*/g, " (")
          .replace(/\s*\)\s*/g, ") ")
          .replace(/\s+/g, " ")
          .trim();

        const timesText = dayData.time
          .split(";")
          .map((time) => time.trim())
          .filter((time) => time)
          .join("\n");

        return `
        <div class="day-plan mb-8 p-6 bg-black bg-opacity-40 rounded-lg border border-blue-700">
          <h3 class="text-2xl font-bold text-blue-400 mb-4 pb-2 border-b border-blue-700">
            Day ${dayNumber}: ${formattedDate}
          </h3>

          <div class="mb-6">
            <h4 class="text-lg font-semibold text-blue-300 mb-3">Topics to Study:</h4>
            <p class="text-white leading-relaxed">${topicsText}</p>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-blue-300 mb-3">Study Schedule:</h4>
            <p class="text-green-400 font-mono whitespace-pre-line">${timesText}</p>
          </div>
        </div>
      `;
      })
      .join("");
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Study Plan</h2>
      <div dangerouslySetInnerHTML={{ __html: formatText(plan) }} />
    </div>
  );
}
