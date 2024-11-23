import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import "./DashboardPage.css";
import SignboardButton from "../../components/SignboardButton/SignboardButton";

const DashboardPage = () => {
  return (
    <Page classList="page pageUnscrollable">
      <Header />
      <MainContainer>
        <div id="dashboardPage-twoHalvesMiddleSection">
          <div className="islandContainer">
            <img
              src="public/images/pixel_art_graphics/backgrounds/small_island.gif"
              alt=""
              className="islandImage"
            />
          </div>
          <div>
            <div id="dashboardPage-signBoardContainer">
              <div id="dashboardPage-signBoard">
                <SignboardButton
                  text="Create"
                  pageToRedirect="/edit_deck/new"
                />
                <SignboardButton text="Decks" pageToRedirect="/decks" />
                <SignboardButton text="About" pageToRedirect="/about" />
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </Page>
  );
};

export default DashboardPage;

/* <button
            onClick={() => {
              checkSession();
            }}
          >
            Check Session
          </button> */

// const checkSession = async () => {
//   try {
//     const response = await fetch(
//       "http://localhost/REBYU-Gamified_Flashcards/includes/auth_sessions/session_check.php",
//       {
//         credentials: "include",
//       }
//     );
//     const data = await response.json();
//     console.log("data:", data);
//   } catch (error) {
//     console.error("Session check failed:", error);
//     //navigate("/"); // Redirect to login on error
//   }
// };
