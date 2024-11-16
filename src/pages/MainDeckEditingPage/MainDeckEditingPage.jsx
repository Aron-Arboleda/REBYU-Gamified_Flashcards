import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ExitButton from "../../components/ExitButton/ExitButton";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import RectangleContainer from "../../components/RectangleContainer/RectangleContainer";
import "./MainDeckEditingPage.css";
import DecksContext from "../../contexts/DecksContext";
import AuthContext from "../../contexts/AuthContext";

const MainDeckEditingPage = ({ mode, initialDeck }) => {
  const { user } = useContext(AuthContext);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [cards, setCards] = useState([{ card_term: "", card_definition: "" }]);
  const { decks, setDecks } = useContext(DecksContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && initialDeck) {
      setDeckTitle(initialDeck.deck_title);
      setDeckDescription(initialDeck.deck_description);
      setCards(initialDeck.deck_cards || []);
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
      setDecks([...decks, { ...payload, deck_id: data.deck_id }]);
      navigate(`/opened_deck/${data.deck_id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
      alert("An error occurred while creating the deck.");
    }
  };

  const handleUpdateDeck = () => {
    // Logic for updating the deck
    // This part will use a separate API endpoint for updates
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
                  value={card.card_term}
                  onChange={(e) =>
                    handleInputChange(index, "card_term", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Enter definition"
                  value={card.card_definition}
                  onChange={(e) =>
                    handleInputChange(index, "card_definition", e.target.value)
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
