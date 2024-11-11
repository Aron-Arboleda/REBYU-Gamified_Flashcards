import { useNavigate } from "react-router-dom";
import "./ExitButton.css";

const ExitButton = ({ url }) => {
  const navigate = useNavigate();
  return (
    <button className="exitButton" onClick={() => navigate(url)}>
      x
    </button>
  );
};

export default ExitButton;
