import { useEffect, useState } from "react";
import "./Character.css";

const Character = ({
  toggleTeleporting = false,
  toggleFiring = false,
  page = "dashboard",
}) => {
  const [teleportingIn, setTeleportingIn] = useState(true);

  useEffect(() => {
    const teleportIn = () => {
      setTeleportingIn(true); // Start teleport animation
      setTimeout(() => {
        setTeleportingIn(false); // End teleport animation after 5 seconds
      }, 800);
    };

    if (page !== "dashboard") {
      teleportIn();
      console.log("Teleport animation started");
    }

    // Clean up any running timers when the component unmounts
    return () => {
      clearTimeout();
    };
  }, [page]);

  return (
    <div className="character_container">
      {page === "dashboard" ? (
        <img
          src={`/images/pixel_art_graphics/character/${
            toggleTeleporting ? "knight_teleport.gif" : "knight_wind.gif"
          }`}
          alt="game-character"
          className="character"
        />
      ) : (
        <img
          src={`/images/pixel_art_graphics/character/${
            toggleFiring
              ? "knight_front_attack.gif"
              : teleportingIn
              ? "knight_front_teleport_in.gif"
              : "knight_front_idle.gif"
          }`}
          alt="game-character"
          className="character_front"
        />
      )}
    </div>
  );
};

export default Character;
