import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signboard.css";

const SignboardButton = ({ pageToRedirect, buttonClass }) => {
  const navigate = useNavigate();

  return (
    <div
      className="dashboardPage-navButtons"
      onClick={() => navigate(pageToRedirect)}
    >
      <div className="stacked-div signBoardButton-container"></div>
      <div
        className={`stacked-div ${buttonClass} signBoardButton-content`}
      ></div>
    </div>
  );
};

const Signboard = () => {
  return (
    <div id="dashboardPage-signBoardContainer">
      <div className="signboard-stackedDiv" id="signBoard-container"></div>
      <div className="signboard-stackedDiv" id="signBoard-content">
        <SignboardButton
          pageToRedirect="/edit_deck/new"
          buttonClass="signboard-button-create"
        />
        <SignboardButton
          pageToRedirect="/decks"
          buttonClass="signboard-button-decks"
        />
        <SignboardButton
          pageToRedirect="/about"
          buttonClass="signboard-button-about"
        />
      </div>
    </div>
  );
};

export default Signboard;
