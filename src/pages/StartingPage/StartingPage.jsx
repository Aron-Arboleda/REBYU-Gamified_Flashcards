import React from "react";
import "./StartingPage.css";
import { useNavigate } from "react-router-dom";

const StartingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page" id="startingPage-container">
      <div className="titleREBYU"></div>
      <button id="startButton" onClick={() => navigate("/login")}></button>
    </div>
  );
};

export default StartingPage;
