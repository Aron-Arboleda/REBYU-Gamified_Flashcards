// ProtectedRoute.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Wait until session validation is complete
  if (loading) {
    return <div>Loading...</div>; // Optionally, replace with a loading spinner
  }

  // Redirect to login if no user is found
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // Allow access if user is authenticated
  return children;
};

export default ProtectedRoute;
