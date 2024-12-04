import { useContext, useState } from "react";
import "./Header.css";
import SideBar from "../SideBar/SideBar";
import AuthContext from "../../contexts/AuthContext";
import DarkBackgroundContainer from "../DarkBackgroundContainer/DarkBackgroundContainer";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const [clickedLogout, setClickedLogout] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  const [clickedProfile, setClickedProfile] = useState(false);
  const [clickedMenu, setClickedMenu] = useState(false);

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
    <>
      <div className="header">
        <div className="header_wrapper">
          <div className="menu_title_container">
            <div
              className="menu_container"
              onClick={() => setClickedMenu(true)}
            >
              <img
                src="/images/pixel_art_graphics/UIs/menu_button.png"
                alt=""
              />
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
        </div>

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
      </div>

      <SideBar clickedMenu={clickedMenu} setClickedMenu={setClickedMenu} />

      {clickedLogout && (
        <DarkBackgroundContainer>
          <div className="logoutContainer">
            <h1 className="hMessage">PREPARE FOR DEPARTURE, HERO</h1>
            <h2 className="hMessage">
              ARE YOU CERTAIN YOU WISH TO LEAVE,
              {user ? user.user_username.toUpperCase() : "Loading..."}?
            </h2>

            <p className="pMessage">
              This isn't just a logout— <b> it's a parting of ways.</b> The
              adventure you've embarked on, the cards you've conquered, and the
              knowledge you've gathered will all be left behind. Once you leave,
              your journey pauses, waiting for your return, but time lost can
              never be regained.
            </p>
            <p className="pMessage">
              <b>
                Will you truly step away from this quest, hero? The choice is
                yours, but remember— you may never know when the path will call
                you again.
              </b>
            </p>
            {logoutError && <p className="error">{logoutError}</p>}
            <div className="cancelAndLogoutContainer">
              <button
                onClick={() => setClickedLogout(false)}
                className="openedDeck-button"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                disabled={logoutLoading}
                className="openedDeck-button openedDeck-deletebutton"
              >
                {logoutLoading ? "Escaping..." : "Log out"}
              </button>
            </div>
          </div>
        </DarkBackgroundContainer>
      )}
    </>
  );
};

export default Header;
