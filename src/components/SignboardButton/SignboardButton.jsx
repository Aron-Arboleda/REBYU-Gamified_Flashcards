import { redirectTo } from "../../utils/helpers";
import "./SignboardButton.css";

const SignboardButton = ({ text, pageToRedirect }) => {
  return (
    <button
      className="dashboardPage-navButtons"
      onClick={() => redirectTo(pageToRedirect)}
    >
      {text}
    </button>
  );
};

export default SignboardButton;
