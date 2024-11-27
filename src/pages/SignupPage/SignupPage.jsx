import React, { useState } from "react";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import StandardContainer from "../../components/StandardContainer/StandardContainer";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { CONFIG } from "../../config";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_username: "",
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const isValidUsername = (username) => {
    const minLength = 3;
    const maxLength = 20;
    const validPattern = /^[a-zA-Z0-9_]+$/;

    return (
      username.length >= minLength &&
      username.length <= maxLength &&
      validPattern.test(username)
    );
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the correct key in the state
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(formData.user_password)) {
      setErrorMessage(
        "Password must have atleast an uppercase, lowercase, number, special character and 8 minimum characters."
      );
      return;
    }

    if (!isValidUsername(formData.user_username)) {
      setErrorMessage(
        "Username should be between 3 and 20 characters long and contains only letters, numbers, and underscores."
      );
      return;
    }

    try {
      const response = await fetch(`${CONFIG.BACKEND_API}users/create.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message); // Success message
        // Optionally clear the form
        setFormData({
          user_username: "",
          user_first_name: "",
          user_last_name: "",
          user_email: "",
          user_password: "",
        });
        navigate("/login");
      } else {
        setErrorMessage(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to create user: " + data.error);
    }
  };

  return (
    <Page>
      <div className="center_x_y_container">
        <StandardContainer>
          <h1 className="form-title">REGISTER</h1>
          <form onSubmit={handleSubmit} className="mainForm">
            <div className="formContainer">
              <label htmlFor="user_username" className="signup-form-labels">
                Username:
              </label>
              <input
                type="text"
                name="user_username" // Ensure name matches formData key
                id="user_username"
                className="form-textboxes"
                value={formData.user_username} // Bind value to formData
                onChange={handleChange} // Correct handler
                required
              />
              <label htmlFor="user_first_name" className="signup-form-labels">
                First Name:
              </label>
              <input
                type="text"
                name="user_first_name" // Ensure name matches formData key
                id="user_first_name"
                className="form-textboxes"
                value={formData.user_first_name}
                onChange={handleChange}
                required
              />
              <label htmlFor="user_last_name" className="signup-form-labels">
                Last Name:
              </label>
              <input
                type="text"
                name="user_last_name" // Ensure name matches formData key
                id="user_last_name"
                className="form-textboxes"
                value={formData.user_last_name}
                onChange={handleChange}
                required
              />
              <label htmlFor="user_email" className="signup-form-labels">
                Email:
              </label>
              <input
                type="email"
                name="user_email" // Ensure name matches formData key
                id="user_email"
                className="form-textboxes"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
              <label htmlFor="user_password" className="signup-form-labels">
                Password:
              </label>
              <input
                type="password"
                name="user_password" // Ensure name matches formData key
                id="user_password"
                className="form-textboxes"
                value={formData.user_password}
                onChange={handleChange}
                required
              />
            </div>
            {errorMessage && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "1rem",
                  fontFamily: "SmallPixel",
                  fontSize: "1.2rem",
                }}
              >
                {errorMessage}
              </p>
            )}
            <div className="buttonContainer">
              <button type="submit" className="form-submit">
                Sign Up
              </button>
            </div>
          </form>
          {responseMessage && (
            <p
              style={{
                textAlign: "center",
                marginTop: "1rem",
                fontFamily: "SmallPixel",
                fontSize: "1.5rem",
              }}
            >
              {responseMessage}
            </p>
          )}
          <p className="auth-p">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>Log in</button>
          </p>
        </StandardContainer>
      </div>
    </Page>
  );
};

export default SignupPage;
