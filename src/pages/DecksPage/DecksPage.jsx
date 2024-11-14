import Deck from "../../components/Deck/Deck";
import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import { userDecks } from "../../utils/mocks";
import "./DecksPage.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DecksPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
            {userDecks
              .filter((deck) => deck.user_id === user.user_id)
              .map((deck, index) => {
                return (
                  <Deck
                    key={index}
                    deckTitle={deck.deck_title}
                    onClickEvent={() =>
                      navigate(`/opened_deck/${deck.deck_id}`)
                    }
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
