import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CalendarSyncButton({ plan }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleSync = async () => {
    if (!user) {
      setError("Please sign in to sync with calendar");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get fresh token
      const token = await user.getIdToken(true);

      // Open Google auth window with state parameter
      const state = btoa(JSON.stringify({ token, userId: user.uid }));
      const authWindow = window.open(
        `http://localhost:8000/auth/google?state=${state}`,
        "Google Calendar Authorization",
        "width=600,height=600"
      );

      // Wait for authorization response
      const authResult = await new Promise((resolve, reject) => {
        window.addEventListener(
          "message",
          async (event) => {
            if (event.origin !== "http://localhost:8000") return;

            if (event.data.type === "calendar_auth_success") {
              // Send the plan to backend with the credentials
              const response = await fetch(
                "http://localhost:8000/sync-calendar",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    plan,
                    calendar_credentials: event.data.credentials,
                  }),
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                reject(
                  new Error(errorData.detail || "Failed to sync with calendar")
                );
                return;
              }

              const data = await response.json();
              resolve(data);
            } else if (event.data.type === "calendar_auth_error") {
              reject(new Error(event.data.error));
            }
          },
          { once: true }
        );

        // Add timeout
        setTimeout(() => {
          reject(new Error("Authentication timed out"));
        }, 300000); // 5 minutes timeout
      });

      console.log("Calendar sync successful:", authResult);
    } catch (err) {
      console.error("Calendar sync error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSync}
        disabled={isLoading}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center w-full md:w-auto disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Syncing...
          </div>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Sync to Google Calendar
          </>
        )}
      </button>
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </>
  );
}
