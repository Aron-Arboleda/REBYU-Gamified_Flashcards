import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { CONFIG } from "../config";

const useSessionCheck = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          `${CONFIG.BACKEND_API}auth_sessions/session_check.php`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        //console.log("data:", data);

        if (data.loggedIn === true) {
          //console.log("data.user:", data.user);
          setUser(data.user);
        } else {
          setUser(null);
          navigate("/"); // Redirect to login if not logged in
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setUser(null);
        //navigate("/"); // Redirect to login on error
      }
    };

    checkSession();
  }, [navigate, setUser]);
};

export default useSessionCheck;
