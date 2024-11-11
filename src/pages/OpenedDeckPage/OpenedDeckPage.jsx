//import { useLocation, useParams } from "react-router-dom";
import { userDecks } from "../../utils/mocks";
import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./OpenedDeckPage.css";
import ExitButton from "../../components/ExitButton/ExitButton";
import { redirectTo } from "../../utils/helpers";

const OpenedDeckPage = () => {
  //const { deck_id } = useParams();

  // const location = useLocation(); // Access the location object
  // const { deck } = location.state || {}; // Extract the passed deck data from state

  // const active_deck = userDecks.find(
  //   (deck) => deck.deck_id === Number(deck_id)
  // );

  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>{userDecks[1].deck_title}</h1>
          <div className="headerColumn2">
            <ExitButton url="/decks" />
          </div>
        </Header>
        <ScrollContainer>
          <p>{userDecks[1].deck_description}</p>
          <div id="openedDeckPage-cardsContainer">
            {userDecks[1].deck_cards.map((card, index) => (
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
        <button onClick={() => redirectTo("/study")}>Go to Battle!</button>
      </MainContainer>
    </Page>
  );
};

export default OpenedDeckPage;
