const TitleHeading = ({ titleText }) => {
  return (
    <h1
      style={{
        fontFamily: "SG12",
        fontSize: "3.5rem",
        margin: "1rem 0rem",
        color: "white",
        WebkitTextStroke: "2px black",
      }}
    >
      {titleText}
    </h1>
  );
};

export default TitleHeading;
