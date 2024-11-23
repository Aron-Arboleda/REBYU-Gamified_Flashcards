import "./StandardContainer.css";

const StandardContainer = ({ children }) => {
  return (
    <div className="parent-stackedDiv">
      <div className="standard-container child-stackedDiv"></div>
      <div className="child-stackedDiv standard-container-content-stackedDiv">
        {children}
      </div>
    </div>
  );
};

export default StandardContainer;
