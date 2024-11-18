import React, { useState, useContext } from "react";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import StandardContainer from "../../components/StandardContainer/StandardContainer";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import AuthContext from "../../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevents the form's default action (page reload)

    try {
      const response = await fetch(
        "http://localhost/REBYU-Gamified_Flashcards/includes/auth_sessions/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const responseJSON = await response.json();

      if (response.ok) {
        console.log("responseJSON.data.user:", responseJSON.data.user);
        login(responseJSON.data.user); // Save the logged-in user's data to the AuthContext
        navigate("/dashboard"); // Redirects to the dashboard
      } else {
        setErrorMessage(responseJSON.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <Page>
      <div className="center_x_y_container">
        <StandardContainer>
          <h1 style={{ textAlign: "center" }}>LOG IN </h1>
          <form onSubmit={handleOnSubmit} className="mainForm">
            <div className="formContainer">
              <label htmlFor="user_email" className="form-labels">
                Email:
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                className="form-textboxes"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
              <label htmlFor="user_password" className="form-labels">
                Password:
              </label>
              <input
                type="password"
                name="user_password"
                id="user_password"
                className="form-textboxes"
                value={formData.user_password}
                onChange={handleChange}
                required
              />
            </div>
            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}
            <div className="buttonContainer">
              <button type="submit" className="form-submit">
                Log in
              </button>
            </div>
          </form>
          <p>
            Don't have an account?{" "}
            <button
              className="form-redirect"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
          </p>
        </StandardContainer>
      </div>
    </Page>
  );
};

export default LoginPage;
