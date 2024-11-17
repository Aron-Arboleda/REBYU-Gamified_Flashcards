import { useParams } from "react-router-dom";
// import { fetchDeckById } from "../../utils/helpers";
import MainDeckEditingPage from "../MainDeckEditingPage/MainDeckEditingPage";
import { useEffect, useState } from "react";
// import DecksContext from "../../contexts/DecksContext";
// import { useContext } from "react";

const UpdateDeckPage = () => {
  const { deck_id } = useParams();
  const [deckData, setDeckData] = useState(null); // State to store deck and cards
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch deck data from the backend
    const fetchDeckData = async () => {
      try {
        const response = await fetch(
          `http://localhost/REBYU-Gamified_Flashcards/includes/decks/read_deckWithCards.php?deck_id=${deck_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch deck data");
        }
        const data = await response.json();
        console.log(data);
        setDeckData(data); // Store the deck and cards
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Handle error
        setLoading(false); // Stop loading
      }
    };

    fetchDeckData();
  }, [deck_id]); // Run when deck_id changes

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  return <MainDeckEditingPage mode="edit" initialDeck={deckData} />;
};

export default UpdateDeckPage;
