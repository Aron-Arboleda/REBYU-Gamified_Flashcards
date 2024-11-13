import { useParams } from "react-router-dom";
import { fetchDeckById } from "../../utils/helpers";
import MainDeckEditingPage from "../MainDeckEditingPage/MainDeckEditingPage";

const UpdateDeckPage = () => {
  const { deck_id } = useParams();
  const initialDeck = fetchDeckById(Number(deck_id)); // Fetch the deck data by ID

  return <MainDeckEditingPage mode="edit" initialDeck={initialDeck} />;
};

export default UpdateDeckPage;
