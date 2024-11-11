import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingScreen from "./pages/StartingPage/StartingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import OpenedDeckPage from "./pages/OpenedDeckPage/OpenedDeckPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingScreen />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/opened_deck/:deck_id" element={<OpenedDeckPage />} />
      </Routes>
    </Router>
  );
}

export default App;
