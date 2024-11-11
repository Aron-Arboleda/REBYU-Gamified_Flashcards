import "./TextInput.css";

const TextInput = ({ previewText }) => {
  return (
    <p>
      <span
        class="textarea"
        role="textbox"
        contenteditable="true"
        data-placeholder={previewText}
      ></span>
    </p>
  );
};

export default TextInput;
