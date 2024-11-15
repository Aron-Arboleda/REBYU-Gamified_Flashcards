import React, { useState, useEffect } from "react";
import "./Flashcards.css";

const Flashcards = () => {
  const flashcards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the largest planet?", answer: "Jupiter" },
    { question: "What is the largest buttocks?", answer: "Mars" },
    { question: "What is the largest hello ?", answer: "Hi" },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipStates, setFlipStates] = useState(flashcards.map(() => false)); // Track flipped state for each card
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getPrevIndex = () =>
    currentCardIndex === 0 ? flashcards.length - 1 : currentCardIndex - 1;
  const getNextIndex = () =>
    currentCardIndex === flashcards.length - 1 ? 0 : currentCardIndex + 1;

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex(getPrevIndex());
      setIsTransitioning(false);
    }, 500); // Time for fade effect
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex(getNextIndex());
      setIsTransitioning(false);
    }, 500); // Time for fade effect
  };

  const toggleFlip = (index) => {
    if (!isTransitioning) {
      setFlipStates((prevState) => {
        const newFlipStates = [...prevState];
        newFlipStates[index] = !newFlipStates[index]; // Flip only the clicked card
        newFlipStates[index - 1] = false; // Flip only the clicked card
        newFlipStates[index + 1] = false; // Flip only the clicked card
        return newFlipStates;
      });
    }
  };

  return (
    <div className="carousel">
      <div className="card-container">
        {/* Previous Card */}
        <div
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
              <h3>{flashcards[getPrevIndex()].question}</h3>
            </div>
            <div className="card-back">
              <p>{flashcards[getPrevIndex()].answer}</p>
            </div>
          </div>
        </div>

        {/* Current Card */}
        <div
          className={`card current-card ${isTransitioning ? "fade-out" : ""}`}
          onClick={() => toggleFlip(currentCardIndex)}
        >
          <div
            className={`card-inner ${
              flipStates[currentCardIndex] ? "flipped" : ""
            }`}
          >
            <div className="card-front">
              <h3>{flashcards[currentCardIndex].question}</h3>
            </div>
            <div className="card-back">
              <p>{flashcards[currentCardIndex].answer}</p>
            </div>
          </div>
        </div>

        {/* Next Card */}
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
              <h3>{flashcards[getNextIndex()].question}</h3>
            </div>
            <div className="card-back">
              <p>{flashcards[getNextIndex()].answer}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-button">
          Previous
        </button>
        <button onClick={handleNext} className="carousel-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
