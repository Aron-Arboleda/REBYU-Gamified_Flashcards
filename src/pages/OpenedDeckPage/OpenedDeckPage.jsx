import { useContext, useState } from "react";
import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./OpenedDeckPage.css";
import ExitButton from "../../components/ExitButton/ExitButton";
import { useNavigate, useParams } from "react-router-dom";
import DecksContext from "../../contexts/DecksContext";
import DarkBackgroundContainer from "../../components/DarkBackgroundContainer/DarkBackgroundContainer/DarkBackgroundContainer";

const OpenedDeckPage = () => {
  const { deck_id } = useParams();
  const { decks, setDecks } = useContext(DecksContext);
  const active_deck = decks.find((deck) => deck.deck_id === Number(deck_id));
  const navigate = useNavigate();
  const [clickedDelete, setClickedDelete] = useState(false);

  if (!active_deck) {
    return <p>Deck not found</p>;
  }

  const handleDeleteConfirm = () => {
    setDecks((prevDecks) =>
      prevDecks.filter((deck) => deck.deck_id !== Number(deck_id))
    );
    navigate("/decks"); // Navigate to the decks page or any other page
  };

  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>{active_deck.deck_title}</h1>
          <div className="headerColumn2">
            <ExitButton url="/decks" />
          </div>
        </Header>
        <ScrollContainer>
          <p>{active_deck.deck_description}</p>
          <div id="openedDeckPage-cardsContainer">
            {active_deck.deck_cards.map((card, index) => (
              <div className="openedDeckPage-cardPreview" key={index}>
                <div className="openedDeckPage-cardPreviewTerm">
                  {card.term}
                </div>
                <div className="openedDeckPage-cardPreviewDefinition">
                  {card.definition}
                </div>
              </div>
            ))}
          </div>
        </ScrollContainer>
        <button
          onClick={() => navigate(`/edit_deck/update/${active_deck.deck_id}`)}
        >
          Update
        </button>
        <button onClick={() => setClickedDelete(true)}>Delete</button>
        <button onClick={() => navigate(`/study/${active_deck.deck_id}`)}>
          Go to Battle!
        </button>
        {clickedDelete && (
          <DarkBackgroundContainer>
            <div className="deleteContainer">
              <h1 className="hDelete">Destroy this deck? </h1>
              <h2 className="hDelete">{active_deck.deck_title}</h2>

              <p className="pDelete">
                Are you truly ready to destroy this deck? This isn't just a
                delete— <b> it's a final farewell. </b> The cards within hold
                every question, every moment, every challenge you've conquered.
                Once destroyed, there's no coming back; it's erased, lost to the
                void. No magic, no power-up can undo it.
              </p>
              <p className="pDelete">
                <b>
                  Do you have the courage to let it go forever? This choice is
                  irreversible... proceed with caution, hero.
                </b>
              </p>
              <div className="cancelAndDeleteContainer">
                <button onClick={() => setClickedDelete(false)}>Cancel</button>
                <button onClick={handleDeleteConfirm}>Annihilate</button>
              </div>
            </div>
          </DarkBackgroundContainer>
        )}
      </MainContainer>
    </Page>
  );
};

export default OpenedDeckPage;
