import React from "react";
import "./StartingPage.css";

const StartingPage = () => {
  return (
    <div className="startingPage-container">
      <button
        id="startButton"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartingPage;
