// App.jsx
import "./styles/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./Routes";
import { DecksProvider } from "./contexts/DecksContext";

function App() {
  return (
    <AuthProvider>
      <DecksProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DecksProvider>
    </AuthProvider>
  );
}

export default App;
