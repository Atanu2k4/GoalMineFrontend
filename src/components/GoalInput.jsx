export default function GoalInput({ goal, setGoal }) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold text-white mb-2">
        What's your goal?
      </label>
      <textarea
        className="w-full p-3 rounded-lg border border-blue-700 bg-black bg-opacity-50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        rows="3"
        placeholder="e.g. I want to learn Python in 30 days"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <p className="text-blue-300 text-sm mt-2">
        Be specific about what you want to achieve and your timeframe
      </p>
    </div>
  );
}
