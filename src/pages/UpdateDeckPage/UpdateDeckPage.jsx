import { useParams } from "react-router-dom";
import { fetchDeckById } from "../../utils/helpers";
import MainDeckEditingPage from "../MainDeckEditingPage/MainDeckEditingPage";
import DecksContext from "../../contexts/DecksContext";
import { useContext } from "react";

const UpdateDeckPage = () => {
  const { deck_id } = useParams();
  const { decks } = useContext(DecksContext);
  const deck = decks.find((deck) => deck.deck_id === Number(deck_id));
  const initialDeck = deck; // Fetch the deck data by ID

  return <MainDeckEditingPage mode="edit" initialDeck={initialDeck} />;
};

export default UpdateDeckPage;
