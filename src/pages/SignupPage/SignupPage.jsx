import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import StandardContainer from "../../components/StandardContainer/StandardContainer";

const SignupPage = () => {
  const handleOnSubmit = () => {
    redirectTo("/login");
  };

  return (
    <Page>
      <MainContainer>
        <div className="container-centered">
          <StandardContainer>
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <form onSubmit={handleOnSubmit} className="mainForm">
              <div className="formContainer">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="inputs"
                />
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="inputs"
                />
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="inputs"
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="inputs"
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="inputs"
                />
              </div>
              <div className="buttonContainer">
                <button type="submit">Sign Up</button>
              </div>
            </form>
            <p>
              Already have an account?
              <a href="/login">
                <button>log in</button>
              </a>
            </p>
          </StandardContainer>
        </div>
      </MainContainer>
    </Page>
  );
};

export default SignupPage;
