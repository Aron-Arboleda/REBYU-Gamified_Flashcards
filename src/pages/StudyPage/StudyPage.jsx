import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import pixelHeart from "/images/pixel_art_graphics/UIs/pixelHeart.png";
import "./StudyPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TitleHeading from "../../components/TitleHeading/TitleHeading";
import AuthContext from "../../contexts/AuthContext";
import { CONFIG } from "../../config";
import Character from "../../components/Character/Character";

const messages = [
  "I see that spark in you",
  "Whatever you choose to do in life, you'll be great. Stand proud.",
  "You did it!, You deserve to feel proud of your progress, no matter how small it is.",
  "See? All those efforts were worth it after all.",
  "You did great! I knew you were special.",
  "The best version of yourself is waiting for you.",
  "Don't stop until someone appreciates all your hard work/effort.",
];

const getMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)];
};

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

  const [isFiring, setIsFiring] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dialogueVisible, setDialogueVisible] = useState(false);

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        const response = await fetch(
          `${CONFIG.BACKEND_API}decks/read_deckWithCards.php?deck_id=${deck_id}&user_id=${user.user_id}`
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

  const firing = () => {
    setIsFiring(true);

    setTimeout(() => {
      const audio = new Audio("/audio/sound_effects/fireball.mp3");
      audio.volume = 0.3;
      audio.play();
    }, 500);

    setTimeout(() => {
      setIsFiring(false);
    }, 1700);
  };

  const getPrevIndex = () =>
    currentCardIndex === 0 ? cards.length - 1 : currentCardIndex - 1;
  const getNextIndex = () =>
    currentCardIndex === cards.length - 1 ? 0 : currentCardIndex + 1;

  const handleHasWon = () => {
    setHasWon(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);

    setTimeout(() => {
      const audio = new Audio("/audio/sound_effects/game-win.MP3");
      audio.volume = 0.3;
      audio.play();
    }, 2000);

    setTimeout(() => {
      setDialogueVisible(true);
    }, 7500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    firing();
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
    firing();
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
        handleHasWon();
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
    <Page classList={"page"}>
      <>
        <Header />
        <MainContainer>
          {visible ? (
            <>
              <TitleHeading titleText={deck.deck_title.toUpperCase()} />
              <div className="studyPage-contentArea">
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
                          <div className="stacked-div card-front-container"></div>
                          <div className="stacked-div card-front-content">
                            <p className="card-front-p">
                              {cards[currentCardIndex].card_definition}
                            </p>
                          </div>
                        </div>
                        <div className="card-back">
                          <div className="stacked-div card-back-container"></div>
                          <div className="stacked-div card-back-content">
                            <p className="card-back-p">
                              {cards[currentCardIndex].card_term}
                            </p>
                          </div>
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

                {/* {hasWon && (
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
          )} */}
              </div>
            </>
          ) : (
            <>
              <div className="medal-container">
                <img
                  src={`/images/pixel_art_graphics/others/${
                    dialogueVisible ? "medal_levitate.gif" : "medal.gif"
                  }`}
                  alt="medal-image"
                  className="medal"
                />
              </div>
              {dialogueVisible && (
                <div className="dialogContainer">
                  <img
                    src="/images/pixel_art_graphics/character/knight_profile.png"
                    alt=""
                    className="knight-profile"
                  />
                  <div className="dialog">
                    <p className="dialog-p">{getMessage()}</p>
                    <div className="youWin-NavContainers">
                      <button
                        onClick={() => {
                          setHasWon(false);
                          setDialogueVisible(false);
                          setVisible(true);
                          restoreDeck();
                        }}
                        className="youWin-NavButton"
                      >
                        Battle Again!
                      </button>
                      <button
                        onClick={() => navigate(`/opened_deck/${deck_id}`)}
                        className="youWin-NavButton"
                      >
                        Back to Deck
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="character-container">
            <Character page="study" toggleFiring={isFiring} />
          </div>
        </MainContainer>
        {hasWon && <div className="whiteBackground fadeInOut"></div>}
      </>
    </Page>
  );
};

export default StudyPage;
