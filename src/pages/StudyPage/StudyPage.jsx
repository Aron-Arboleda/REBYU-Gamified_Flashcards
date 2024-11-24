import React, { useContext, useEffect, useState } from "react";
import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import pixelHeart from "/images/pixel_art_graphics/UIs/pixelHeart.png";
import "./StudyPage.css";
import DarkBackgroundContainer from "../../components/DarkBackgroundContainer/DarkBackgroundContainer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContentArea from "../../components/ContentArea/ContentArea";
import TitleHeading from "../../components/TitleHeading/TitleHeading";
import AuthContext from "../../contexts/AuthContext";

const StudyPage = () => {
  const { user } = useContext(AuthContext);
  const { deck_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [deckData, setDeckData] = useState({ deck: "", cards: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { deck, cards } = deckData;

  const [health, setHealth] = useState(100);
  const [isShuffled, setIsShuffled] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const totalFlashcards = cards.length;
  const healthStep = 100 / totalFlashcards;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipStates, setFlipStates] = useState(cards.map(() => false));
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        const response = await fetch(
          `http://localhost/REBYU-Gamified_Flashcards/includes/decks/read_deckWithCards.php?deck_id=${deck_id}&user_id=${user.user_id}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong!");
        }
        const data = await response.json();
        setDeckData(data);
        setLoading(false);
      } catch (err) {
        navigate("/not-found", {
          state: {
            errorMessage: err.message || "An unknown error occurred.",
            pathName: location.pathname,
          },
        });
      }
    };

    user && fetchDeckData();
  }, [user, deck_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!deckData) {
    return <p>Deck not found</p>;
  }

  const getPrevIndex = () =>
    currentCardIndex === 0 ? cards.length - 1 : currentCardIndex - 1;
  const getNextIndex = () =>
    currentCardIndex === cards.length - 1 ? 0 : currentCardIndex + 1;

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex(getPrevIndex());
      setHealth((prevHealth) => Math.min(100, prevHealth + healthStep));
      setIsTransitioning(false);
      setFlipStates((prevState) => {
        const newFlipStates = [...prevState];
        newFlipStates[currentCardIndex - 1] = false;
        newFlipStates[currentCardIndex + 1] = false;
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
          newFlipStates[currentCardIndex - 1] = false;
          newFlipStates[currentCardIndex + 1] = false;
          return newFlipStates;
        });
      } else {
        setCurrentCardIndex(getNextIndex());
        setIsTransitioning(false);
        setHealth(0);
        setHasWon(true);
      }
    }, 500); // Time for fade effect
  };

  const toggleFlip = (index) => {
    if (!isTransitioning) {
      setFlipStates((prevState) => {
        const newFlipStates = [...prevState];
        newFlipStates[index] = !newFlipStates[index];
        return newFlipStates;
      });
    }
  };

  // Function to shuffle the deck using Fisher-Yates algorithm
  const shuffleDeck = () => {
    const shuffledDeck = [...cards];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; // Swap
    }
    setDeck(shuffledDeck);
    setCurrentCardIndex(0);
    setHealth(100);
  };

  // Function to restore the deck to its original order
  const restoreDeck = () => {
    setCurrentCardIndex(0);
    setHealth(100);
  };

  const toggleShuffle = () => {
    if (isShuffled) {
      restoreDeck();
    } else {
      shuffleDeck();
    }
    setIsShuffled(!isShuffled);
  };

  return (
    <Page>
      <Header />
      <MainContainer>
        <TitleHeading titleText={deck.deck_title.toUpperCase()} />
        <ContentArea>
          <div className="healthBarContainer">
            <div className="healthBar">
              <img
                className="healthBarHeartIcon"
                src={pixelHeart}
                alt="Heart Icon"
              />
              <div
                className="healthBarFill"
                style={{ width: `${health}%` }}
              ></div>
            </div>
          </div>
          <div className="counterContainer">
            <p className="counterText">
              {currentCardIndex + 1} / {totalFlashcards}
            </p>
          </div>
          {/* Flashcards */}
          <div className="carousel">
            <div className="card-container">
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
                    <p className="card-front-p">
                      {cards[currentCardIndex].card_definition}
                    </p>
                  </div>
                  <div className="card-back">
                    <p className="card-back-p">
                      {cards[currentCardIndex].card_term}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* NAVIGATIONS */}
          <div className="navigationButtons">
            <button
              onClick={handlePrev}
              disabled={currentCardIndex === 0}
              className="arrow-button study-left-button "
            ></button>
            <button
              onClick={handleNext}
              disabled={hasWon}
              className="arrow-button study-right-button" // Disable if the user has won
            ></button>
            {/* <label className="shuffleSwitch">
              <input
                type="checkbox"
                checked={isShuffled}
                onChange={toggleShuffle}
              />
              Shuffle
            </label>*/}
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
        </ContentArea>
      </MainContainer>
    </Page>
  );
};

export default StudyPage;
