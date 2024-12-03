import React, { createContext, useState, useEffect } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [teleporting, setTeleporting] = useState(false);

  const teleport = () => {
    setTeleporting(true);
    setTimeout(() => setTeleporting(false), 2300);
  };

  return (
    <CharacterContext.Provider value={{ teleport, teleporting }}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
