const StandardContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "400px",
        height: "50vh",
        backgroundColor: "rgb(248, 243, 187)",
        padding: "2rem",
        borderRadius: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default StandardContainer;
