export default function PlanViewer({ plan }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-white flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        Your Plan
      </h2>
      <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-700">
        <ul className="space-y-3">
          {plan.map((item, idx) => (
            <li key={idx} className="text-white flex items-start">
              <span className="mr-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
