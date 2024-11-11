import Deck from "../../components/Deck/Deck";
import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import { userDecks } from "../../utils/mocks";
import "./DecksPage.css";
import { redirectTo } from "../../utils/helpers";

const DecksPage = () => {
  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>Decks</h1>
          <div className="headerColumn2">
            <ExitButton url="/dashboard" />
          </div>
        </Header>
        <ScrollContainer>
          <div id="decksPage-decksContainer">
            {userDecks.map((deck, index) => {
              return (
                <Deck
                  deckTitle={deck.deck_title}
                  onClickEvent={() => redirectTo("/opened_deck")}
                />
              );
            })}
          </div>
        </ScrollContainer>
      </MainContainer>
    </Page>
  );
};

export default DecksPage;
