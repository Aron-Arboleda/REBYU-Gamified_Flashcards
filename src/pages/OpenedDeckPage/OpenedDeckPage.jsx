//import { useLocation, useParams } from "react-router-dom";
import { userDecks } from "../../utils/mocks";
import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./OpenedDeckPage.css";
import ExitButton from "../../components/ExitButton/ExitButton";
import { redirectTo } from "../../utils/helpers";
import { useParams } from "react-router-dom";
import { fetchDeckById } from "../../utils/helpers";

const OpenedDeckPage = () => {
  const { deck_id } = useParams();
  const active_deck = fetchDeckById(Number(deck_id));

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
          onClick={() => redirectTo(`/edit_deck/update/${active_deck.deck_id}`)}
        >
          Update
        </button>
        <button onClick={() => redirectTo("/study")}>Delete</button>
        <button onClick={() => redirectTo("/study")}>Go to Battle!</button>
      </MainContainer>
    </Page>
  );
};

export default OpenedDeckPage;
