import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import "./DashboardPage.css";
import SignboardButton from "../../components/SignboardButton/SignboardButton";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import DarkBackgroundContainer from "../../components/DarkBackgroundContainer/DarkBackgroundContainer/DarkBackgroundContainer";
import { useNavigate } from "react-router-dom";
import useCheckSession from "../../hooks/useSessionCheck";
import SideBar from "../../components/SideBar/SideBar";

const DashboardPage = () => {
  //useCheckSession();

  const { user, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await fetch(
        "http://localhost/REBYU-Gamified_Flashcards/includes/auth_sessions/session_check.php",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("data:", data);
    } catch (error) {
      console.error("Session check failed:", error);
      //navigate("/"); // Redirect to login on error
    }
  };

  const [clickedLogout, setClickedLogout] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  const [clickedMenu, setClickedMenu] = useState(false);
  const [clickedProfile, setClickedProfile] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      setLogoutLoading(true);
      await logout();
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
      <Header>
        <div className="menu_title_container">
          <div className="menu_container" onClick={() => setClickedMenu(true)}>
            <img src="/images/pixel_art_graphics/UIs/menu_button.png" alt="" />
          </div>
          <div className="title_container">
            <img
              src="/images/pixel_art_graphics/backgrounds/title_without_card.png"
              alt=""
            />
          </div>
        </div>
        <div className="name_profile_container">
          <h1 className="name_heading">
            {user
              ? `${user.user_first_name} ${user.user_last_name}`
              : "Loading..."}
          </h1>
          <div
            className="dashboard_profile_container"
            onClick={() =>
              clickedProfile
                ? setClickedProfile(false)
                : setClickedProfile(true)
            }
          >
            <img
              src="/images/pixel_art_graphics/UIs/profile_placeholder.jpg"
              alt=""
            />
          </div>
        </div>

        {/* <button
            onClick={() => {
              checkSession();
            }}
          >
            Check Session
          </button> */}
        {/*  */}
      </Header>

      <SideBar clickedMenu={clickedMenu} setClickedMenu={setClickedMenu} />

      {clickedProfile && (
        <div className="profile_panel">
          <div className="profile_panel_info_container">
            <div className="dashboard_profile_container">
              <img
                src="/images/pixel_art_graphics/UIs/profile_placeholder.jpg"
                alt=""
              />
            </div>
            <div>
              <p className="profile_panel_p">
                {user ? user.user_username : "Loading..."}
              </p>
              <p className="profile_panel_p">
                {user ? user.user_email : "Loading..."}
              </p>
            </div>
          </div>
          <div>
            <button
              className="logout-button"
              onClick={() => {
                setClickedLogout(true);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
      <MainContainer>
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
                Are you certain you wish to leave,{" "}
                {user ? user.user_username : "Loading..."}?
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
