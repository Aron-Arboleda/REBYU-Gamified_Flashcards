import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import shopIcon from "@assets/images/icons/icon-shop.png";
import "./DashboardPage.css";
import SignboardButton from "../../components/SignboardButton/SignboardButton";
import { redirectTo } from "../../utils/helpers";

const DashboardPage = () => {
  return (
    <Page>
      <MainContainer>
        <Header></Header>
        <button className="iconTextButtons" onClick={() => redirectTo("/shop")}>
          <img src={shopIcon} alt="" />
          <p>Shop</p>
        </button>
        <div id="dashboardPage-twoHalvesMiddleSection">
          <div>Character</div>
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
