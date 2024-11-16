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
        "http://localhost/REBYU-Gamified_Flashcards/includes/users/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        login(data.data); // Save the logged-in user's data to the AuthContext
        navigate("/dashboard"); // Redirects to the dashboard
      } else {
        setErrorMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <Page>
      <MainContainer>
        <div className="container-centered">
          <StandardContainer>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <form onSubmit={handleOnSubmit} className="mainForm">
              <div className="formContainer">
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="user_password">Password</label>
                <input
                  type="password"
                  name="user_password"
                  id="user_password"
                  className="inputs"
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
                <button type="submit">Login</button>
              </div>
            </form>
            <p>
              Don't have an account?{" "}
              <button onClick={() => navigate("/signup")}>Register</button>
            </p>
          </StandardContainer>
        </div>
      </MainContainer>
    </Page>
  );
};

export default LoginPage;
