import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signboard.css";

const SignboardButton = ({ pageToRedirect, buttonClass }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`dashboardPage-navButtons ${buttonClass}`}
      onClick={() => navigate(pageToRedirect)}
    ></button>
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
