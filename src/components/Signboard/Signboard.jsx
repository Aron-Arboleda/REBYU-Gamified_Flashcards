import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signboard.css";
import CharacterContext from "../../contexts/CharacterContext";

const SignboardButton = ({ pageToRedirect, buttonClass }) => {
  const navigate = useNavigate();
  const { teleport } = useContext(CharacterContext);

  return (
    <div
      className="dashboardPage-navButtons"
      onClick={() => {
        teleport();

        const audio = new Audio("/audio/sound_effects/teleport.mp3");
        audio.volume = 0.3;
        audio.play();

        setTimeout(() => navigate(pageToRedirect), 2300);
      }}
    >
      <div className="stacked-div signBoardButton-container"></div>
      <div
        className={`stacked-div ${buttonClass} signBoardButton-content`}
      ></div>
    </div>
  );
};

const Signboard = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Play audio once when the component renders
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    };
    playAudio();
  }, []); // Empty dependency array ensures it runs only on mount

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
      <audio
        ref={audioRef}
        src="/audio/sound_effects/pageFlip.MP3"
        preload="auto"
      />
    </div>
  );
};

export default Signboard;
