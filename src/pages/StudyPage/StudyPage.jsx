import React, { useContext, useState } from "react";
import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import { userDecks } from "../../utils/mocks";
import pixelHeart from "../../assets/images/icons/pixelHeart.png";
import "./StudyPage.css";
import DarkBackgroundContainer from "../../components/DarkBackgroundContainer/DarkBackgroundContainer/DarkBackgroundContainer";
import { useNavigate, useParams } from "react-router-dom";
import DecksContext from "../../contexts/DecksContext";

const StudyPage = () => {
  const { deck_id } = useParams();
  const { decks } = useContext(DecksContext);
  const active_deck = decks.find((deck) => deck.deck_id === Number(deck_id));

  // const [currentCard, setCurrentCard] = useState(0); // Track current flashcard
  // const [previousCard, setPreviousCard] = useState(null); // Track previous card for undo
  const [health, setHealth] = useState(100); // 100% health at start
  //const [showTerm, setShowTerm] = useState(true); // Show term or definition
  const [deck, setDeck] = useState(active_deck.deck_cards); // Deck of cards
  const [isShuffled, setIsShuffled] = useState(false); // Track if deck is shuffled
  const [isFlipped, setIsFlipped] = useState(true); // Track if terms and definitions are flipped
  const [hasWon, setHasWon] = useState(false); // Track if the user has won
  const totalFlashcards = deck.length; // Total cards in the deck
  const healthStep = 100 / totalFlashcards; // Health change per card

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipStates, setFlipStates] = useState(deck.map(() => false)); // Track flipped state for each card
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getPrevIndex = () =>
    currentCardIndex === 0 ? deck.length - 1 : currentCardIndex - 1;
  const getNextIndex = () =>
    currentCardIndex === deck.length - 1 ? 0 : currentCardIndex + 1;

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex(getPrevIndex());
      setHealth((prevHealth) => Math.min(100, prevHealth + healthStep));
      setIsTransitioning(false);
      setFlipStates((prevState) => {
        const newFlipStates = [...prevState];
        newFlipStates[currentCardIndex - 1] = false; // Flip only the clicked card
        newFlipStates[currentCardIndex + 1] = false; // Flip only the clicked card
        return newFlipStates;
      });
    }, 500); // Time for fade effect
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentCardIndex < totalFlashcards - 1) {
        setCurrentCardIndex(getNextIndex());
        setIsTransitioning(false);
        setHealth((prevHealth) => Math.max(0, prevHealth - healthStep));
        setFlipStates((prevState) => {
          const newFlipStates = [...prevState];
          newFlipStates[currentCardIndex - 1] = false; // Flip only the clicked card
          newFlipStates[currentCardIndex + 1] = false; // Flip only the clicked card
          return newFlipStates;
        });
      } else {
        setCurrentCardIndex(getNextIndex());
        setIsTransitioning(false);
        setHealth(0);
        setHasWon(true); // Set win state when user reaches the last card
      }
    }, 500); // Time for fade effect
  };

  const toggleFlip = (index) => {
    if (!isTransitioning) {
      setFlipStates((prevState) => {
        const newFlipStates = [...prevState];
        newFlipStates[index] = !newFlipStates[index]; // Flip only the clicked card
        // newFlipStates[index - 1] = false; // Flip only the clicked card
        // newFlipStates[index + 1] = false; // Flip only the clicked card
        return newFlipStates;
      });
    }
  };

  const navigate = useNavigate();

  // Function to shuffle the deck using Fisher-Yates algorithm
  const shuffleDeck = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; // Swap
    }
    setDeck(shuffledDeck); // Update the deck to be shuffled
    setCurrentCardIndex(0); // Start at the first card after shuffle
    setHealth(100); // Reset health to 100
  };

  // Function to restore the deck to its original order
  const restoreDeck = () => {
    setDeck(active_deck.deck_cards); // Restore the original deck
    setCurrentCardIndex(0); // Start at the first card after restoring
    setHealth(100); // Reset health to 100
  };

  // Handle next card navigation
  // const handleNext = () => {
  //   if (currentCard < totalFlashcards - 1) {
  //     setPreviousCard(currentCard); // Save the current card before moving to next
  //     setCurrentCard(currentCard + 1);
  //     setHealth((prevHealth) => Math.max(0, prevHealth - healthStep));
  //     setShowTerm(true); // Reset to show term on new card
  //   } else {
  //     setHealth(0);
  //     setHasWon(true); // Set win state when user reaches the last card
  //   }
  // };

  // // Handle previous card navigation
  // const handlePrevious = () => {
  //   if (currentCard > 0) {
  //     setPreviousCard(currentCard); // Save the current card before going to previous
  //     setCurrentCard(currentCard - 1);
  //     setHealth((prevHealth) => Math.min(100, prevHealth + healthStep));
  //     setShowTerm(true); // Reset to show term on previous card
  //   }
  // };

  // Handle shuffle switch toggle
  const toggleShuffle = () => {
    if (isShuffled) {
      restoreDeck(); // Restore deck to original order when shuffle is off
    } else {
      shuffleDeck(); // Shuffle deck when shuffle is on
    }
    setIsShuffled(!isShuffled); // Toggle shuffle state
  };

  // const toggleFlip = () => setShowTerm(!showTerm);

  const toggleTermsAndDefinitionsFlipped = () => {
    setIsFlipped((prev) => !prev);
  };

  // const renderCardContent = (card) => {
  //   if (isFlipped) {
  //     return (
  //       <>
  //         <div className="flashcard-front">
  //           <p>{card.definition}</p>
  //         </div>
  //         <div className="flashcard-back">
  //           <p>{card.term}</p>
  //         </div>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <div className="flashcard-front">
  //           <p>{card.term}</p>
  //         </div>
  //         <div className="flashcard-back">
  //           <p>{card.definition}</p>
  //         </div>
  //       </>
  //     );
  //   }
  // };

  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>{active_deck.deck_title}</h1>
          <div className="headerColumn2">
            <ExitButton url={`/opened_deck/${active_deck.deck_id}`} />
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
            {currentCardIndex + 1} / {totalFlashcards}
          </p>
        </div>

        {/* Flashcards */}
        <div className="carousel">
          <div className="card-container">
            {/* Previous Card */}
            {/* <div
              className={`card displayNone previous-card ${
                isTransitioning ? "fade-out" : ""
              }`}
            >
              <div
                className={`card-inner ${
                  flipStates[getPrevIndex()] ? "flipped" : ""
                }`}
                onClick={() => toggleFlip(getPrevIndex())}
              >
                <div className="card-front">
                  <h3>{deck[getPrevIndex()].definition}</h3>
                </div>
                <div className="card-back">
                  <p>{deck[getPrevIndex()].term}</p>
                </div>
              </div>
            </div> */}

            {/* Current Card */}
            <div
              className={`card current-card ${
                isTransitioning ? "fade-out" : ""
              }`}
              onClick={() => toggleFlip(currentCardIndex)}
            >
              <div
                className={`card-inner ${
                  flipStates[currentCardIndex] ? "flipped" : ""
                }`}
              >
                <div className="card-front">
                  <h3>{deck[currentCardIndex].definition}</h3>
                </div>
                <div className="card-back">
                  <p>{deck[currentCardIndex].term}</p>
                </div>
              </div>
            </div>

            {/* Next Card
            <div
              className={`card displayNone next-card ${
                isTransitioning ? "fade-out" : ""
              }`}
            >
              <div
                className={`card-inner ${
                  flipStates[getNextIndex()] ? "flipped" : ""
                }`}
                onClick={() => toggleFlip(getNextIndex())}
              >
                <div className="card-front">
                  <h3>{deck[getNextIndex()].definition}</h3>
                </div>
                <div className="card-back">
                  <p>{deck[getNextIndex()].term}</p>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="carousel-controls">
            <button onClick={handlePrev} className="carousel-button">
              Previous
            </button>
            <button onClick={handleNext} className="carousel-button">
              Next
            </button>
          </div> */}
        </div>

        {/* NAVIGATIONS */}
        <div className="navigationButtons">
          <button onClick={handlePrev} disabled={currentCardIndex === 0}>
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
          {/* <label className="flipSwitch">
            <input
              type="checkbox"
              checked={isFlipped}
              onChange={toggleTermsAndDefinitionsFlipped}
            />
            Flip Term and Definition
          </label> */}
        </div>
        {hasWon && (
          <DarkBackgroundContainer>
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
              <button onClick={() => navigate(`/opened_deck/${deck_id}`)}>
                Back to Deck
              </button>
            </div>
          </DarkBackgroundContainer>
        )}
      </MainContainer>
    </Page>
  );
};

export default StudyPage;
