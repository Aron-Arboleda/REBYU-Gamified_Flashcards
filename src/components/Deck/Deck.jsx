import "./Deck.css";

const Deck = ({ deckTitle, onClickEvent }) => {
  return (
    <button className="deck" onClick={onClickEvent}>
      {deckTitle}
    </button>
  );
};

export default Deck;
