import RectangleContainer from "../RectangleContainer/RectangleContainer";
import TextInput from "../TextInput/TextInput";

const CardContainer = () => {
  return (
    <RectangleContainer>
      <TextInput previewText="Term" />
      <TextInput previewText="Definition" />
      <button>Remove</button>
    </RectangleContainer>
  );
};

export default CardContainer;
