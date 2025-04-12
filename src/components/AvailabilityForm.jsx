export default function AvailabilityForm({
  hoursPerDay,
  setHoursPerDay,
  timeSlot,
  setTimeSlot,
}) {
  return (
    <>
      {/* Hours Per Day Section */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">
          How many hours per day can you spend?
        </label>
        <input
          type="number"
          min="0.5"
          step="0.5"
          className="w-full p-2 rounded border mt-2"
          placeholder="e.g. 2"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
        />
      </div>

      {/* Time Interval Section */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">
          What time of day are you available?
        </label>
        <div className="flex gap-4 mt-2">
          <input
            type="time"
            className="p-2 rounded border w-full"
            value={timeSlot.start}
            onChange={(e) =>
              setTimeSlot({ ...timeSlot, start: e.target.value })
            }
          />
          <span className="self-center">to</span>
          <input
            type="time"
            className="p-2 rounded border w-full"
            value={timeSlot.end}
            onChange={(e) => setTimeSlot({ ...timeSlot, end: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}
