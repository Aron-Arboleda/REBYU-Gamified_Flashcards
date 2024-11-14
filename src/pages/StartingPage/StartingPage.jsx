import React from "react";
import "./StartingPage.css";
import { useNavigate } from "react-router-dom";

const StartingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page" id="startingPage-container">
      <button id="startButton" onClick={() => navigate("/login")}>
        Start Game
      </button>
    </div>
  );
};

export default StartingPage;
