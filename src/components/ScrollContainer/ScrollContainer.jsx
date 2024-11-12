import "./ScrollContainer.css";

const ScrollContainer = ({ children, height = "70vh", maxWidth = "600px" }) => {
  return (
    <div
      className="scrollContainer"
      style={{
        width: "100%",
        maxWidth: maxWidth,
        height: height,
        backgroundColor: "rgb(248, 243, 187)",
        borderRadius: "20px",
        margin: "20px auto",
        padding: "2rem",
        textAlign: "left",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
