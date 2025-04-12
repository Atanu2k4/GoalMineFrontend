export default function AvailabilityForm({
  hoursPerDay,
  setHoursPerDay,
  timeSlot,
  setTimeSlot,
}) {
  return (
    <div className="space-y-6">
      {/* Hours Per Day Section */}
      <div>
        <label className="block text-lg font-semibold text-white mb-2">
          How many hours per day can you spend?
        </label>
        <input
          type="number"
          min="0.5"
          step="0.5"
          className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g. 2"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
        />
      </div>

      {/* Time Interval Section */}
      <div>
        <label className="block text-lg font-semibold text-white mb-2">
          What time of day are you available?
        </label>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1">
            <input
              type="time"
              className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={timeSlot.start}
              onChange={(e) =>
                setTimeSlot({ ...timeSlot, start: e.target.value })
              }
            />
          </div>
          <span className="text-white font-medium">to</span>
          <div className="flex-1">
            <input
              type="time"
              className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={timeSlot.end}
              onChange={(e) =>
                setTimeSlot({ ...timeSlot, end: e.target.value })
              }
            />
          </div>
        </div>
        <p className="text-blue-300 text-sm mt-2">
          Select a time range when you're most productive
        </p>
      </div>
    </div>
  );
}
