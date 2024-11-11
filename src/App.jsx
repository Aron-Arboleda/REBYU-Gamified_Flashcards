import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingScreen from "./pages/StartingPage/StartingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CreatePage from "./pages/CreatePage/CreatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingScreen />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
