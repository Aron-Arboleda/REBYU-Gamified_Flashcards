import "./ScrollContainer.css";

const ScrollContainer = ({ children, height = "70vh", maxWidth = "600px" }) => {
  return <div className="scrollContainer">{children}</div>;
};

export default ScrollContainer;
