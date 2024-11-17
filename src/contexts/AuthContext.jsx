import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tracks session validation
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    navigate("/dashboard");
  };

  const logout = async () => {
    try {
      await fetch(
        "http://localhost/REBYU-Gamified_Flashcards/includes/auth_sessions/logout.php",
        {
          method: "POST",
          credentials: "include",
        }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost/REBYU-Gamified_Flashcards/includes/auth_sessions/session_check.php",
  //         {
  //           credentials: "include",
  //         }
  //       );
  //       const data = await response.json();

  //       if (data.loggedIn) {
  //         setUser(data.user);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error("Session check failed:", error);
  //       setUser(null);
  //     } finally {
  //       setLoading(false); // Session validation complete
  //     }
  //   };

  //   checkSession();
  // }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
