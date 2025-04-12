export default function PlanViewer({ plan }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Your Plan</h2>
      <ul className="list-disc pl-6 space-y-2">
        {plan.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
