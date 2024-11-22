import "./ScrollContainer.css";

const ScrollContainer = ({ children, height = "70vh", maxWidth = "600px" }) => {
  return (
    <>
      <div className="parent-stackedDiv">
        <div className="scrollContainer child-stackedDiv"></div>
        <div className="child-stackedDiv content-stackedDiv">{children}</div>
      </div>
    </>
  );
};

export default ScrollContainer;
