import React from "react";
import "./StartingPage.css";
import { redirectTo } from "../../utils/helpers";

const StartingPage = () => {
  return (
    <div className="page" id="startingPage-container">
      <button id="startButton" onClick={() => redirectTo("/dashboard")}>
        Start Game
      </button>
    </div>
  );
};

export default StartingPage;
