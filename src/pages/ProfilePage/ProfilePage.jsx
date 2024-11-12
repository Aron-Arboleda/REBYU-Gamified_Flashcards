import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import "./ProfilePage.css";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";

const ProfilePage = () => {
  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>Profile</h1>
          <div className="headerColumn2">
            <ExitButton url="/dashboard" />
          </div>
        </Header>
        <div id="profilePage-mainContainer">
          <div></div>
          <div id="profilePage-profileInfo">
            <ScrollContainer>
              <h2>Info</h2>
              <div id="profileInfo-editable">
                <p>Name: Aron Rez Arboleda</p>
                <p>Username: aron_arboleda</p>
                <p>Email: aron.arboleda@up.edu</p>
              </div>
              <div id="profileInfo-notEditable">
                <p>Number of Decks: 4</p>
                <p>Joined in: Jan. 1, 2024</p>
                <p>Total studied: 3 decks</p>
              </div>
            </ScrollContainer>
          </div>
        </div>
      </MainContainer>
    </Page>
  );
};

export default ProfilePage;
