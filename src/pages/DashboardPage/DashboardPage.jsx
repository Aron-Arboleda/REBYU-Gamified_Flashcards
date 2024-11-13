import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import shopIcon from "@assets/images/icons/icon-shop.png";
import "./DashboardPage.css";
import SignboardButton from "../../components/SignboardButton/SignboardButton";
import { redirectTo } from "../../utils/helpers";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
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
              <SignboardButton text="Create" pageToRedirect="/create" />
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
