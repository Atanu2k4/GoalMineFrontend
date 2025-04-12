import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/landingpage";
import GoalApp from "./pages/GoalApp";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <GoalApp />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
