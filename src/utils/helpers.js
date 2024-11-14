import { userDecks } from "./mocks";

const fetchDeckById = (id) => {
  return userDecks.find((deck) => deck.deck_id === id);
};

const createDeck = (newDeck) => {
  userDecks.push(newDeck);
  return newDeck;
};

const updateDeck = (id, updatedDeck) => {
  const deckIndex = userDecks.findIndex((deck) => deck.deck_id === id);
  if (deckIndex !== -1) {
    userDecks[deckIndex] = { ...userDecks[deckIndex], ...updatedDeck };
    return true;
  }
  return false;
};

export { fetchDeckById, updateDeck, createDeck };
