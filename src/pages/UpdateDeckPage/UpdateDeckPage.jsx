import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { fetchDeckById } from "../../utils/helpers";
import MainDeckEditingPage from "../MainDeckEditingPage/MainDeckEditingPage";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
// import DecksContext from "../../contexts/DecksContext";
// import { useContext } from "react";

const UpdateDeckPage = () => {
  const { user } = useContext(AuthContext);
  const { deck_id } = useParams();
  const [deckData, setDeckData] = useState(null); // State to store deck and cards
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch deck data from the backend
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
        setDeckData(data); // Store the deck and cards
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
  }, [user, deck_id]); // Run when deck_id changes

  return <MainDeckEditingPage mode="edit" initialDeck={deckData} />;
};

export default UpdateDeckPage;
