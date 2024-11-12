import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import StandardContainer from "../../components/StandardContainer/StandardContainer";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevents the form's default action (page reload)
    navigate("/dashboard"); // Redirects to the dashboard
  };

  return (
    <Page>
      <MainContainer>
        <div class="container-centered">
          <StandardContainer>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <form onSubmit={handleOnSubmit} className="mainForm">
              <div class="formContainer">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="inputs"
                />
              </div>
              <div class="buttonContainer">
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
