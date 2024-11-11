import { useLocation, useParams } from "react-router-dom";
//import { userDecks } from "../../utils/mocks";

const OpenedDeckPage = () => {
  const { deck_id } = useParams();

  const location = useLocation(); // Access the location object
  const { deck } = location.state || {}; // Extract the passed deck data from state

  // const active_deck = userDecks.find(
  //   (deck) => deck.deck_id === Number(deck_id)
  // );

  return (
    <div>
      <h1>{deck.deck_title}</h1>
      <h2>{deck.deck_description}</h2>
    </div>
  );
};

export default OpenedDeckPage;
