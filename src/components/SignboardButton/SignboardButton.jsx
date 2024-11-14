import { useNavigate } from "react-router-dom";
import "./SignboardButton.css";

const SignboardButton = ({ text, pageToRedirect }) => {
  const navigate = useNavigate();

  return (
    <button
      className="dashboardPage-navButtons"
      onClick={() => navigate(pageToRedirect)}
    >
      {text}
    </button>
  );
};

export default SignboardButton;
