export default function CalendarSyncButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Sync to Google Calendar
    </button>
  );
}
