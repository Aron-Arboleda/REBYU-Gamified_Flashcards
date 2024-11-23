import "./Deck.css";

const Deck = ({ deckTitle, onClickEvent }) => {
  return (
    <div className="deck" onClick={onClickEvent}>
      <div className="stacked-div deck-container"></div>
      <div className="stacked-div deck-content">{deckTitle}</div>
    </div>
  );
};

export default Deck;
