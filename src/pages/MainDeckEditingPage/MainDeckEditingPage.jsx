import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ExitButton from "../../components/ExitButton/ExitButton";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import RectangleContainer from "../../components/RectangleContainer/RectangleContainer";
import "./MainDeckEditingPage.css";
// import DecksContext from "../../contexts/DecksContext";
import AuthContext from "../../contexts/AuthContext";
import TitleHeading from "../../components/TitleHeading/TitleHeading";
import ContentArea from "../../components/ContentArea/ContentArea";

const MainDeckEditingPage = ({ mode, initialDeck }) => {
  const { user } = useContext(AuthContext);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [cards, setCards] = useState([{ card_term: "", card_definition: "" }]);
  // const { decks, setDecks } = useContext(DecksContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && initialDeck) {
      setDeckTitle(initialDeck.deck.deck_title);
      setDeckDescription(initialDeck.deck.deck_description);
      setCards(initialDeck.cards || []);
    }
  }, [mode, initialDeck]);

  const handleInputChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const addCard = () => {
    setCards([...cards, { card_term: "", card_definition: "" }]);
  };

  const removeCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCreateDeck = async () => {
    const payload = {
      deck_title: deckTitle,
      user_id: user.user_id,
      deck_description: deckDescription,
      cards: cards.filter(
        (card) => card.card_term.trim() && card.card_definition.trim()
      ),
    };

    try {
      console.log("Payload:", JSON.stringify(payload));

      const response = await fetch(
        "http://localhost/REBYU-Gamified_Flashcards/includes/decks/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("An error occurred while creating the deck.");
      }

      const data = await response.json();
      alert("Deck created successfully!");
      // setDecks([...decks, { ...payload, deck_id: data.deck_id }]);
      navigate(`/opened_deck/${data.deck_id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
      alert("An error occurred while creating the deck.");
    }
  };

  const handleUpdateDeck = async () => {
    const payload = {
      deck_id: initialDeck.deck.deck_id,
      deck_title: deckTitle,
      deck_description: deckDescription,
      cards: cards.filter(
        (card) => card.card_term.trim() && card.card_definition.trim()
      ),
    };

    try {
      console.log("Update Payload:", JSON.stringify(payload));

      const response = await fetch(
        "http://localhost/REBYU-Gamified_Flashcards/includes/decks/update.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("An error occurred while updating the deck.");
      }

      const data = await response.json();
      alert("Deck updated successfully!");
      // setDecks(
      //   decks.map((deck) =>
      //     deck.deck_id === initialDeck.deck.deck_id
      //       ? { ...deck, ...payload }
      //       : deck
      //   )
      // );
      navigate(`/opened_deck/${initialDeck.deck.deck_id}`);
    } catch (error) {
      console.error("Error updating deck:", error);
      alert("An error occurred while updating the deck.");
    }
  };

  return (
    <Page>
      <Header />
      <MainContainer>
        <ContentArea>
          <TitleHeading
            titleText={mode === "edit" ? "UPDATE" : "CREATE A DECK"}
          />
          <ScrollContainer>
            <div className="mainDeckEditingPage-deckInitialInputsContainer">
              <input
                type="text"
                placeholder="Enter deck title"
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
                className="mainDeckEditingPage-deckTitleInput"
              />
              <textarea
                placeholder="Enter deck description"
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="mainDeckEditingPage-deckDescriptionInput"
              />
            </div>
            <div className="mainDeckEditingPage-cardsContainer">
              {cards.map((card, index) => (
                <RectangleContainer key={index}>
                  <div className="mainDeckEditingPage-inputsContainer">
                    <div>
                      <textarea
                        placeholder="Enter term"
                        value={card.card_term}
                        onChange={(e) =>
                          handleInputChange(index, "card_term", e.target.value)
                        }
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        className="mainDeckEditingPage-cardTermInput"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Enter definition"
                        value={card.card_definition}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "card_definition",
                            e.target.value
                          )
                        }
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        className="mainDeckEditingPage-cardDefinitionInput"
                      />
                    </div>
                  </div>
                  <button
                    className="mainDeckEditingPage-removeButton"
                    onClick={() => removeCard(index)}
                  >
                    Remove
                  </button>
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
        </ContentArea>
      </MainContainer>
    </Page>
  );
};

export default MainDeckEditingPage;
