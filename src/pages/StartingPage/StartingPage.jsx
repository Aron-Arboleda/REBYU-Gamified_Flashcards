import React, { useContext } from "react";
import "./StartingPage.css";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page/Page";
import AuthContext from "../../contexts/AuthContext";

const StartingPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await fetch(
        "http://localhost/REBYU-Gamified_Flashcards/includes/auth_sessions/session_check.php",
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      //console.log("data:", data);

      if (data.loggedIn === true) {
        console.log("Checked session. User is logged in");
        setUser(data.user);
        navigate("/dashboard"); // Redirect to login if not logged in
      } else {
        setUser(null);
        navigate("/login"); // Redirect to login if not logged in
      }
    } catch (error) {
      console.error("Session check failed:", error);
      setUser(null);
      //navigate("/"); // Redirect to login on error
    }
  };

  return (
    <Page>
      <div className="center_x_y_container">
        <div className="titleREBYU"></div>
        <button id="startButton" onClick={() => checkSession()}></button>
      </div>
    </Page>
  );
};

export default StartingPage;
