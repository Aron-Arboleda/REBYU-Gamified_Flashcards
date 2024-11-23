import { useState, useEffect, useContext } from "react";
import Deck from "../../components/Deck/Deck";
import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./DecksPage.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext"; // Still need this to access the authenticated user
import useSessionCheck from "../../hooks/useSessionCheck";
import ContentArea from "../../components/ContentArea/ContentArea";
import TitleHeading from "../../components/TitleHeading/TitleHeading";

const DecksPage = () => {
  const { user, setUser } = useContext(AuthContext); // Access user info from AuthContext
  const [decks, setDecks] = useState([]); // Local state for decks
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDecks = async () => {
      // if (!user || !user.user_id) {
      //   setError("User not authenticated.");
      //   setLoading(false);

      //   return;
      // }
      if (user) {
        try {
          const response = await fetch(
            `http://localhost/REBYU-Gamified_Flashcards/includes/decks/read_decksOfUser.php?user_id=${user.user_id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch decks.");
          }

          const data = await response.json();
          if (data.decks) {
            setDecks(data.decks); // Set the decks data locally
          } else {
            setError("No decks found for this user.");
          }
        } catch (err) {
          setError(err.message); // Handle fetch errors
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDecks();
  }, [user]); // Fetch decks when user changes or on mount

  // If loading, show loading indicator
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there's an error, show the error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Page classList="page">
      <Header />
      <MainContainer>
        <ContentArea>
          <TitleHeading titleText="DECKS" />
          <ScrollContainer>
            <div id="decksPage-decksContainer">
              {decks.length === 0 ? (
                <p>No decks created</p>
              ) : (
                decks.map((deck, index) => {
                  return (
                    <Deck
                      key={index}
                      deckTitle={deck.deck_title}
                      onClickEvent={() =>
                        navigate(`/opened_deck/${deck.deck_id}`)
                      }
                    />
                  );
                })
              )}
            </div>
          </ScrollContainer>
        </ContentArea>
      </MainContainer>
    </Page>
  );
};

export default DecksPage;
