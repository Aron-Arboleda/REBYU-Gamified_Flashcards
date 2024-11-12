import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingScreen from "./pages/StartingPage/StartingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import OpenedDeckPage from "./pages/OpenedDeckPage/OpenedDeckPage";
import StudyPage from "./pages/StudyPage/StudyPage";
import DecksPage from "./pages/DecksPage/DecksPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingScreen />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* <Route path="/opened_deck/:deck_id" element={<OpenedDeckPage />} /> */}
        <Route path="/opened_deck" element={<OpenedDeckPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/decks" element={<DecksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
