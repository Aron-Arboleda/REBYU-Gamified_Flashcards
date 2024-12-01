import "./styles/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./Routes";
import { useEffect, useRef, useState } from "react";

function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const playAudio = async () => {
      try {
        audioRef.current.muted = isMuted;
        await audioRef.current.play();
        console.log("Audio is playing");
      } catch (error) {
        console.error("Autoplay was prevented:", error);
      }
    };

    playAudio();
  }, [isMuted]);
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    audioRef.current.muted = !isMuted;
  };

  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <audio
          ref={audioRef}
          src="/audio/background_music/starting_background_music.MP3"
          preload="auto"
          loop
        />
        <button
          id="audio-button"
          className={isMuted ? "audio-button-off" : "audio-button-on"}
          onClick={toggleMute}
        ></button>
      </AuthProvider>
    </Router>
  );
}

export default App;
