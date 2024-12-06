import React, { useState } from "react";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import StandardContainer from "../../components/StandardContainer/StandardContainer";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { CONFIG } from "../../config";
import { Eye, EyeOff } from "lucide-react";

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
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const isValidName = (name) => {
    const validPattern = /^[a-zA-Z]+$/;
    return validPattern.test(name);
  };

  const isValidEmail = (email) => {
    const validPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validPattern.test(email);
  };

  const isValidPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-_=+\[\]{};:'"\\|,.<>\/?`~]/.test(
      password
    );

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
    const hasLetter = /[a-zA-Z]/.test(username);

    return (
      username.length >= minLength &&
      username.length <= maxLength &&
      validPattern.test(username) &&
      hasLetter
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isValidName(formData.user_first_name) ||
      !isValidName(formData.user_last_name)
    ) {
      setErrorMessage("First and last names can only contain letters.");
      return;
    } else if (
      isValidName(formData.user_first_name) &&
      isValidName(formData.user_last_name)
    ) {
      setErrorMessage("");
    }

    if (!isValidUsername(formData.user_username)) {
      setErrorMessage(
        "Username should atleast have a letter, 3 to 20 characters, and contains only letters, numbers, and underscores."
      );
      return;
    } else if (isValidUsername(formData.user_username)) {
      setErrorMessage("");
    }

    if (!isValidEmail(formData.user_email)) {
      setErrorMessage("Invalid email address.");
      return;
    } else if (isValidEmail(formData.user_email)) {
      setErrorMessage("");
    }

    if (!isValidPassword(formData.user_password)) {
      setErrorMessage(
        "Password must have atleast an uppercase, lowercase, number, special character and 8 minimum characters."
      );
      return;
    } else if (isValidPassword(formData.user_password)) {
      setErrorMessage("");
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
        setResponseMessage(data.message);

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
    <Page classList="page pageUnscrollable authPage">
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
                name="user_username"
                id="user_username"
                className="form-textboxes"
                value={formData.user_username}
                onChange={handleChange}
                required
              />
              <label htmlFor="user_first_name" className="signup-form-labels">
                First Name:
              </label>
              <input
                type="text"
                name="user_first_name"
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
                name="user_last_name"
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
                name="user_email"
                id="user_email"
                className="form-textboxes"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
              <label htmlFor="user_password" className="signup-form-labels">
                Password:
              </label>
              <div style={{ position: "relative", display: "grid" }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="user_password"
                  id="user_password"
                  className="form-textboxes"
                  value={formData.user_password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={toggleVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {passwordVisible ? (
                    <EyeOff size={20} style={{ paddingTop: "4px" }} />
                  ) : (
                    <Eye size={20} style={{ paddingTop: "4px" }} />
                  )}
                </span>
              </div>
            </div>
            {errorMessage && (
              <p className="auth-error-message">{errorMessage}</p>
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
