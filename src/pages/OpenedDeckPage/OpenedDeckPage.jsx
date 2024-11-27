import { useContext, useState, useEffect } from "react";
import Page from "../../components/Page/Page";
import MainContainer from "../../components/MainContainer/MainContainer";
import Header from "../../components/Header/Header";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./OpenedDeckPage.css";
import ExitButton from "../../components/ExitButton/ExitButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DarkBackgroundContainer from "../../components/DarkBackgroundContainer/DarkBackgroundContainer";
import ContentArea from "../../components/ContentArea/ContentArea";
import TitleHeading from "../../components/TitleHeading/TitleHeading";
import AuthContext from "../../contexts/AuthContext";
import { CONFIG } from "../../config";

const OpenedDeckPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { deck_id } = useParams();
  const navigate = useNavigate();
  const [clickedDelete, setClickedDelete] = useState(false);
  const [deckData, setDeckData] = useState({
    deck: {
      deck_id: 1,
      deck_title: "Loading...",
      deck_description: "Loading...",
    },
    cards: [],
  }); // State to store deck and cards
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [deleteError, setDeleteError] = useState(null); // Error state for delete
  const [deleteLoading, setDeleteLoading] = useState(false); // Loading state for delete

  useEffect(() => {
    // Fetch deck data from the backend
    const fetchDeckData = async () => {
      try {
        const response = await fetch(
          `${CONFIG.BACKEND_API}decks/read_deckWithCards.php?deck_id=${deck_id}&user_id=${user.user_id}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong!");
        }
        const data = await response.json();
        setDeckData(data); // Store the deck and cards
        setLoading(false); // Stop loading
      } catch (err) {
        navigate("/not-found", {
          state: {
            errorMessage: err.message || "An unknown error occurred.",
            pathName: location.pathname,
          },
        });
        //console.log("Going in the error block: ", err.message);

        setLoading(false); // Stop loading
      }
    };
    user && fetchDeckData();
  }, [user, deck_id]); // Run when deck_id changes

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true); // Start loading for delete action
    setDeleteError(null); // Clear previous delete error

    try {
      const response = await fetch(`${CONFIG.BACKEND_API}decks/delete.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deck_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the deck.");
      }

      const data = await response.json();
      if (data.message === "Deck and associated cards deleted successfully.") {
        navigate("/decks"); // Redirect to decks page
      } else {
        throw new Error(data.message || "Unknown error during deletion.");
      }
    } catch (err) {
      setDeleteError(err.message); // Handle deletion error
    } finally {
      setDeleteLoading(false); // Stop loading for delete action
    }
  };

  // if (loading) {
  //   return <p>Loading...</p>; // Show loading indicator
  // }

  // if (error) {
  //   return <p>Error: {error}</p>; // Show error message
  // }

  // if (!deckData) {
  //   return <p>Deck not found</p>; // Show if no deck is found
  // }

  const { deck, cards } = deckData;

  return (
    <Page>
      <Header />
      <MainContainer>
        <ContentArea>
          <TitleHeading titleText={deck.deck_title.toUpperCase()} />
          <ScrollContainer>
            <p className="openedDeck-description">{deck.deck_description}</p>
            <div id="openedDeckPage-cardsContainer">
              {cards.map((card, index) => (
                <div className="openedDeckPage-cardPreview" key={index}>
                  <div className="openedDeckPage-cardPreviewTerm">
                    {card.card_term}
                  </div>
                  <div className="openedDeckPage-cardPreviewDefinition">
                    {card.card_definition}
                  </div>
                </div>
              ))}
            </div>
          </ScrollContainer>
          <div className="openedDeck-updateAndDeleteContainer">
            <button
              onClick={() => navigate(`/edit_deck/update/${deck.deck_id}`)}
              className="openedDeck-button"
            >
              Update
            </button>
            <button
              onClick={() => setClickedDelete(true)}
              className="openedDeck-button openedDeck-deletebutton"
            >
              Delete
            </button>
          </div>
          <button
            className="openedDeck-goToBattleButton"
            onClick={() => navigate(`/study/${deck.deck_id}`)}
          >
            Go to Battle!
          </button>
          {clickedDelete && (
            <DarkBackgroundContainer>
              <div className="deleteContainer">
                <h1 className="hDelete">
                  {"Destroy this deck?".toUpperCase()}
                </h1>
                <h2 className="hDelete">{deck.deck_title.toUpperCase()}</h2>
                <p className="pDelete">
                  Are you truly ready to destroy this deck? This isn't just a
                  delete— <b> it's a final farewell. </b> The cards within hold
                  every question, every moment, every challenge you've
                  conquered. Once destroyed, there's no coming back; it's
                  erased, lost to the void. No magic, no power-up can undo it.
                </p>
                <p className="pDelete">
                  <b>
                    Do you have the courage to let it go forever? This choice is
                    irreversible... proceed with caution, hero.
                  </b>
                </p>
                {deleteError && <p className="error">{deleteError}</p>}
                <div className="cancelAndDeleteContainer">
                  <button
                    onClick={() => setClickedDelete(false)}
                    className="openedDeck-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={deleteLoading}
                    className="openedDeck-button openedDeck-deletebutton"
                  >
                    {deleteLoading ? "Annihilating..." : "Annihilate"}
                  </button>
                </div>
              </div>
            </DarkBackgroundContainer>
          )}
        </ContentArea>
      </MainContainer>
    </Page>
  );
};

export default OpenedDeckPage;
