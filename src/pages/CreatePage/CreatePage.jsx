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

const CreatePage = () => {
  const [cards, setCards] = useState([{ term: "", definition: "" }]);

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
            <ExitButton />
          </div>
        </Header>
        <ScrollContainer>
          <div className="createPage-deckInitialInputsContainer">
            <TextInput previewText="Deck Title" />
            <TextInput previewText="Deck Description" />
          </div>

          {cards.map((card, index) => (
            <RectangleContainer>
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
        </ScrollContainer>
      </MainContainer>
    </Page>
  );
};

export default CreatePage;
