// contexts/DecksContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { userDecks } from "../utils/mocks";

const DecksContext = createContext();

export const DecksProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch decks for the logged-in user
      fetchDecksForUser(user.user_id).then(setDecks);
    } else {
      setDecks([]);
    }
  }, [user]);

  return (
    <DecksContext.Provider value={{ decks, setDecks }}>
      {children}
    </DecksContext.Provider>
  );
};

const fetchDecksForUser = async (userId) => {
  // Filter decks from the userDecks array based on userId
  return userDecks.filter((deck) => deck.user_id === userId);
};

export default DecksContext;
