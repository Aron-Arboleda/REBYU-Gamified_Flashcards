import React, { useContext, useEffect, useRef, useState } from "react";
import "./StartingPage.css";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page/Page";
import AuthContext from "../../contexts/AuthContext";
import { CONFIG } from "../../config";
import Character from "../../components/Character/Character";

const StartingPage = () => {
  const { setUser } = useContext(AuthContext);
  const [clickedStartGame, setClickedStartGame] = useState(false);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_API}auth_sessions/session_check.php`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      //console.log("data:", data);

      if (data.loggedIn === true) {
        console.log("Checked session. User is logged in");
        setClickedStartGame(true);
        navigate("/dashboard"); // Redirect to login if not logged in
        // setTimeout(() => {
        //   setUser(data.user);
        //   navigate("/dashboard"); // Redirect to login if not logged in
        // }, 3000);
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
    <Page classList="page pageUnscrollable pageHeightFull" id="starting-page">
      {!clickedStartGame && (
        <div className="center_x_y_container">
          <div className="titleREBYU"></div>
          <button id="startButton" onClick={() => checkSession()}></button>
          <div className="character-container start-game-character">
            <Character />
          </div>
        </div>
      )}
    </Page>
  );
};

export default StartingPage;
