import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ExitButton from "../../components/ExitButton/ExitButton";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./CreatePage.css";
import TextInput from "../../components/TextInput/TextInput";
import CardContainer from "../../components/CardContainer/CardContainer";
import React, { useState } from "react";
import RectangleContainer from "../../components/RectangleContainer/RectangleContainer";
import { useNavigate } from "react-router-dom";
import { userDecks as initialDecks } from "../../utils/mocks"; // Import userDecks

const CreatePage = () => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [cards, setCards] = useState([{ term: "", definition: "" }]);
  const navigate = useNavigate();

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

  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>Create a deck</h1>
          <div className="headerColumn2">
            <ExitButton url="/dashboard" />
          </div>
        </Header>
        <ScrollContainer>
          <div className="createPage-deckInitialInputsContainer">
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
          <div className="createPage-cardsContainer">
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
          id="createPage-createButton"
          onClick={() => {
            const id = initialDecks.length + 1; // New deck ID
            const newDeck = {
              deck_id: id,
              deck_title: deckTitle,
              deck_description: deckDescription,
              deck_cards: cards,
            };

            navigate(`/opened_deck`, {
              state: { deck: newDeck }, // Pass the new deck as state
            });
          }}
        >
          CREATE
        </button>
      </MainContainer>
    </Page>
  );
};

export default CreatePage;
