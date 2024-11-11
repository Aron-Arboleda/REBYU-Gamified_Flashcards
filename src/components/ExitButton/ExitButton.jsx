import "./ExitButton.css";

const ExitButton = () => {
  return (
    <button className="exitButton" onClick={() => window.history.back()}>
      x
    </button>
  );
};

export default ExitButton;
