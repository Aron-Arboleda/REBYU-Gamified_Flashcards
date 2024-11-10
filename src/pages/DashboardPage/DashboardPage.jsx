import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import shopIcon from "@assets/images/icons/icon-shop.png";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <Page>
      <MainContainer>
        <Header></Header>
        <button className="iconTextButtons">
          <img src={shopIcon} alt="" />
          <p>Shop</p>
        </button>
        <div id="dashboardPage-twoHalvesMiddleSection">
          <div>Character</div>
          <div>Navigation</div>
        </div>
      </MainContainer>
    </Page>
  );
};

export default DashboardPage;
