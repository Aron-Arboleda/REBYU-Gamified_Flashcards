import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import "./DashboardPage.css";
import SignboardButton from "../../components/SignboardButton/SignboardButton";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>{user.user_username}</h1>
        </Header>

        <div id="dashboardPage-twoHalvesMiddleSection">
          <div></div>
          <div>
            <div id="dashboardPage-signBoard">
              <SignboardButton text="Create" pageToRedirect="/edit_deck/new" />
              <SignboardButton text="Decks" pageToRedirect="/decks" />
              <SignboardButton text="About" pageToRedirect="/about" />
            </div>
          </div>
        </div>
      </MainContainer>
    </Page>
  );
};

export default DashboardPage;
