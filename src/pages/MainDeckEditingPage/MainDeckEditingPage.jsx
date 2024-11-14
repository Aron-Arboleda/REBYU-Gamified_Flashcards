import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ExitButton from "../../components/ExitButton/ExitButton";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./MainDeckEditingPage.css";
import TextInput from "../../components/TextInput/TextInput";
import CardContainer from "../../components/CardContainer/CardContainer";
import React, { useContext, useEffect, useState } from "react";
import RectangleContainer from "../../components/RectangleContainer/RectangleContainer";
import { useNavigate } from "react-router-dom";
import { userDecks } from "../../utils/mocks"; // Import userDecks
import { updateDeck, createDeck } from "../../utils/helpers";
import DecksContext from "../../contexts/DecksContext";

const MainDeckEditingPage = ({ mode, initialDeck }) => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [cards, setCards] = useState([{ term: "", definition: "" }]);
  const { decks, setDecks } = useContext(DecksContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && initialDeck) {
      setDeckTitle(initialDeck.deck_title);
      setDeckDescription(initialDeck.deck_description);
      setCards(initialDeck.deck_cards);
    }
  }, [mode, initialDeck]);

  const handleInputChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const addCard = () => {
    setCards([...cards, { term: "", definition: "" }]);
  };

  // Handler to remove a card
  const removeCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleUpdateDeck = () => {
    const updatedDeck = {
      deck_id: initialDeck.deck_id,
      deck_title: deckTitle,
      deck_description: deckDescription,
      deck_cards: cards,
    };

    const updatedDecks = decks.map((deck) =>
      deck.deck_id === initialDeck.deck_id ? updatedDeck : deck
    );

    setDecks(updatedDecks);
    updateDeck(updatedDeck);
    navigate(`/opened_deck/${initialDeck.deck_id}`);
  };

  const handleCreateDeck = () => {
    const id = userDecks.length + 1; // New deck ID
    const newDeck = {
      deck_id: id,
      deck_title: deckTitle,
      deck_description: deckDescription,
      deck_cards: cards,
    };

    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
    navigate(`/opened_deck/${id}`);
  };

  return (
    <Page>
      <MainContainer>
        <Header>
          {mode === "edit" ? <h1>Update deck</h1> : <h1>Create a deck</h1>}
          <div className="headerColumn2">
            <ExitButton url="/dashboard" />
          </div>
        </Header>
        <ScrollContainer>
          <div className="mainDeckEditingPage-deckInitialInputsContainer">
            <input
              type="text"
              placeholder="Enter deck title"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter deck description"
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
            />
          </div>
          <div className="mainDeckEditingPage-cardsContainer">
            {cards.map((card, index) => (
              <RectangleContainer key={index}>
                <input
                  type="text"
                  placeholder="Enter term"
                  value={card.term}
                  onChange={(e) =>
                    handleInputChange(index, "term", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Enter definition"
                  value={card.definition}
                  onChange={(e) =>
                    handleInputChange(index, "definition", e.target.value)
                  }
                />
                <button onClick={() => removeCard(index)}>Remove</button>
              </RectangleContainer>
            ))}
            <button onClick={addCard}>Add Card</button>
          </div>
        </ScrollContainer>
        <button
          id="mainDeckEditingPage-createButton"
          onClick={() => {
            if (mode === "edit") {
              handleUpdateDeck();
            } else {
              handleCreateDeck();
            }
          }}
        >
          {mode === "edit" ? "Done" : "Create"}
        </button>
      </MainContainer>
    </Page>
  );
};

export default MainDeckEditingPage;
