import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import "./DashboardPage.css";
import SignboardButton from "../../components/SignboardButton/SignboardButton";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import DarkBackgroundContainer from "../../components/DarkBackgroundContainer/DarkBackgroundContainer/DarkBackgroundContainer";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  // States for handling the logout process
  const [clickedLogout, setClickedLogout] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  const handleLogoutConfirm = async () => {
    try {
      setLogoutLoading(true);

      // handle logout
    } catch (error) {
      setLogoutError(
        "Something went wrong while logging you out. Please try again."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>{user.user_username}</h1>
          <button
            className="logout-button"
            onClick={() => {
              setClickedLogout(true);
            }}
          >
            Log Out
          </button>
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
        {clickedLogout && (
          <DarkBackgroundContainer>
            <div className="logoutContainer">
              <h1 className="hLogout">Prepare for Departure, Hero</h1>
              <h2 className="hLogout">
                Are you certain you wish to leave, {user.username}?{" "}
              </h2>

              <p className="pLogout">
                This isn't just a logout— <b> it's a parting of ways.</b> The
                adventure you've embarked on, the cards you've conquered, and
                the knowledge you've gathered will all be left behind. Once you
                leave, your journey pauses, waiting for your return, but time
                lost can never be regained.
              </p>
              <p className="pLogout">
                <b>
                  Will you truly step away from this quest, hero? The choice is
                  yours, but remember— you may never know when the path will
                  call you again.
                </b>
              </p>
              {logoutError && <p className="error">{logoutError}</p>}
              <div className="cancelAndLogoutContainer">
                <button onClick={() => setClickedLogout(false)}>Cancel</button>
                <button onClick={handleLogoutConfirm} disabled={logoutLoading}>
                  {logoutLoading ? "Escaping..." : "Log out"}
                </button>
              </div>
            </div>
          </DarkBackgroundContainer>
        )}
      </MainContainer>
    </Page>
  );
};

export default DashboardPage;
