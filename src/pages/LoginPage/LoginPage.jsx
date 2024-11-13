import React, { useState, useContext } from "react";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import StandardContainer from "../../components/StandardContainer/StandardContainer";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import AuthContext from "../../contexts/AuthContext";
import { users } from "../../utils/mocks";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = (email, password) => {
    return users.find(
      (user) => user.user_email === email && user.user_password === password
    );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevents the form's default action (page reload)
    const user = validate(email, password);
    if (user) {
      login(user);
      navigate("/dashboard"); // Redirects to the dashboard
    } else {
      alert("Invalid credentials");
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="inputs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="buttonContainer">
                <button type="submit">Login</button>
              </div>
            </form>
            <p>
              Don't have an account?
              <a href="/signup">
                <button>Register</button>
              </a>
            </p>
          </StandardContainer>
        </div>
      </MainContainer>
    </Page>
  );
};

export default LoginPage;
