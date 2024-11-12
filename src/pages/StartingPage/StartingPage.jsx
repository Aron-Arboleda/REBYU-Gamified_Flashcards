import React from "react";
import "./StartingPage.css";
import { redirectTo } from "../../utils/helpers";

const StartingPage = () => {
  return (
    <div className="page" id="startingPage-container">
      <button id="startButton" onClick={() => redirectTo("/login")}>
        Start Game
      </button>
    </div>
  );
};

export default StartingPage;
