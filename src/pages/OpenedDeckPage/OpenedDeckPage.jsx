import { useContext } from "react";
import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./OpenedDeckPage.css";
import ExitButton from "../../components/ExitButton/ExitButton";
import { useNavigate, useParams } from "react-router-dom";
import DecksContext from "../../contexts/DecksContext";

const OpenedDeckPage = () => {
  const { deck_id } = useParams();
  const { decks } = useContext(DecksContext);
  const active_deck = decks.find((deck) => deck.deck_id === Number(deck_id));
  const navigate = useNavigate();

  if (!active_deck) {
    return <p>Deck not found</p>;
  }

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
        <button onClick={() => navigate("/study")}>Delete</button>
        <button onClick={() => navigate("/study")}>Go to Battle!</button>
      </MainContainer>
    </Page>
  );
};

export default OpenedDeckPage;
