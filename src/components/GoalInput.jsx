export default function GoalInput({ goal, setGoal }) {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold">What's your goal?</label>
      <textarea
        className="w-full p-2 rounded border mt-2"
        rows="3"
        placeholder="e.g. I want to learn Python in 30 days"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
    </div>
  );
}
