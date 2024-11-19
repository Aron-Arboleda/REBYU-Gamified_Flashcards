import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingScreen from "./pages/StartingPage/StartingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import OpenedDeckPage from "./pages/OpenedDeckPage/OpenedDeckPage";
import StudyPage from "./pages/StudyPage/StudyPage";
import DecksPage from "./pages/DecksPage/DecksPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NewDeckPage from "./pages/NewDeckPage/NewDeckPage";
import UpdateDeckPage from "./pages/UpdateDeckPage/UpdateDeckPage";
//import Flashcards from "./pages/Flashcards/Flashcards";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartingScreen />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opened_deck/:deck_id"
        element={
          <ProtectedRoute>
            <OpenedDeckPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit_deck/new"
        element={
          <ProtectedRoute>
            <NewDeckPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit_deck/update/:deck_id"
        element={
          <ProtectedRoute>
            <UpdateDeckPage />
          </ProtectedRoute>
        }
      />
      <Route path="/study/:deck_id" element={<StudyPage />} />
      <Route
        path="/decks"
        element={
          <ProtectedRoute>
            <DecksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AppRoutes;
