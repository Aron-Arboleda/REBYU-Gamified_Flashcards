import React, { useState } from "react";
import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import { userDecks } from "../../utils/mocks";
import pixelHeart from "../../assets/images/icons/pixelHeart.png";
import "./StudyPage.css";
import { redirectTo } from "../../utils/helpers";

const StudyPage = () => {
  const [currentCard, setCurrentCard] = useState(0); // Track current flashcard
  const [previousCard, setPreviousCard] = useState(null); // Track previous card for undo
  const [health, setHealth] = useState(100); // 100% health at start
  const [showTerm, setShowTerm] = useState(true); // Show term or definition
  const [deck, setDeck] = useState(userDecks[6].deck_cards); // Deck of cards
  const [isShuffled, setIsShuffled] = useState(false); // Track if deck is shuffled
  const [hasWon, setHasWon] = useState(false); // Track if the user has won
  const totalFlashcards = deck.length; // Total cards in the deck
  const healthStep = 100 / totalFlashcards; // Health change per card

  // Function to shuffle the deck using Fisher-Yates algorithm
  const shuffleDeck = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; // Swap
    }
    setDeck(shuffledDeck); // Update the deck to be shuffled
    setCurrentCard(0); // Start at the first card after shuffle
    setHealth(100); // Reset health to 100
  };

  // Function to restore the deck to its original order
  const restoreDeck = () => {
    setDeck(userDecks[6].deck_cards); // Restore the original deck
    setCurrentCard(0); // Start at the first card after restoring
    setHealth(100); // Reset health to 100
  };

  // Handle next card navigation
  const handleNext = () => {
    if (currentCard < totalFlashcards - 1) {
      setPreviousCard(currentCard); // Save the current card before moving to next
      setCurrentCard(currentCard + 1);
      setHealth((prevHealth) => Math.max(0, prevHealth - healthStep));
      setShowTerm(true); // Reset to show term on new card
    } else {
      setHasWon(true); // Set win state when user reaches the last card
    }
  };

  // Handle previous card navigation
  const handlePrevious = () => {
    if (currentCard > 0) {
      setPreviousCard(currentCard); // Save the current card before going to previous
      setCurrentCard(currentCard - 1);
      setHealth((prevHealth) => Math.min(100, prevHealth + healthStep));
      setShowTerm(true); // Reset to show term on previous card
    }
  };

  // Undo button functionality
  const handleUndo = () => {
    if (previousCard !== null) {
      setCurrentCard(previousCard); // Go back to the previous card
      setPreviousCard(null); // Reset previous card after undoing
      setHealth((prevHealth) => Math.min(100, prevHealth + healthStep)); // Restore health
      setShowTerm(true); // Reset to show term
    }
  };

  // Handle shuffle switch toggle
  const toggleShuffle = () => {
    if (isShuffled) {
      restoreDeck(); // Restore deck to original order when shuffle is off
    } else {
      shuffleDeck(); // Shuffle deck when shuffle is on
    }
    setIsShuffled(!isShuffled); // Toggle shuffle state
  };

  const toggleFlip = () => setShowTerm(!showTerm);

  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>{userDecks[6].deck_title}</h1>
          <div className="headerColumn2">
            <ExitButton url="/opened_deck" />
          </div>
        </Header>
        <div className="healthBarContainer">
          <img
            className="healthBarHeartIcon"
            src={pixelHeart}
            alt="Heart Icon"
          />
          <div className="healthBar">
            <div
              className="healthBarFill"
              style={{ width: `${health}%` }}
            ></div>
          </div>
        </div>

        <div className="counterContainer">
          <p>
            {currentCard + 1} / {totalFlashcards}
          </p>
        </div>

        {/* Flashcard with flip functionality */}
        <div
          className={`flashcard ${showTerm ? "" : "flipped"}`}
          onClick={toggleFlip}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <h2>{deck[currentCard].term}</h2>
            </div>
            <div className="flashcard-back">
              <p>{deck[currentCard].definition}</p>
            </div>
          </div>
        </div>
        <div className="navigationButtons">
          <button onClick={handlePrevious} disabled={currentCard === 0}>
            {"<--"}
          </button>
          <button
            onClick={handleNext}
            disabled={hasWon} // Disable if the user has won
          >
            {"-->"}
          </button>
          <label className="shuffleSwitch">
            <input
              type="checkbox"
              checked={isShuffled}
              onChange={toggleShuffle}
            />
            Shuffle
          </label>
        </div>
        {hasWon && (
          <div className="darkbackgroundContainer">
            <div className="darkbackgroundContainer-wrapper">
              <h2>You Win!</h2>
              <button
                onClick={() => {
                  setHasWon(false);
                  restoreDeck();
                }}
              >
                Battle Again!
              </button>
              <button onClick={() => redirectTo("/opened_deck")}>
                Back to Deck
              </button>
            </div>
          </div>
        )}
      </MainContainer>
    </Page>
  );
};

export default StudyPage;
