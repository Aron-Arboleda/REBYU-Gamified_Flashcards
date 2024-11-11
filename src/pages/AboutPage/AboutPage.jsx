import AboutProfile from "../../components/AboutProfile/AboutProfile";
import ExitButton from "../../components/ExitButton/ExitButton";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <Page>
      <MainContainer>
        <Header>
          <h1>About</h1>
          <div className="headerColumn2">
            <ExitButton url="/dashboard" />
          </div>
        </Header>
        <ScrollContainer>
          <h2>What is Rebyu?</h2>
          <p>
            REBYU (Review, Educate, Boost, Your Understanding) is a
            flashcard-based web app designed to bring a dynamic, game-like
            experience to studying. Much like Quizlet, it allows users to
            create, review, and test themselves with digital flashcards, but it
            stands out by incorporating a vibrant, gamified visual style to make
            learning more engaging and enjoyable. With REBYU, studying becomes
            an interactive journey, encouraging users to progress and stay
            motivated as they explore their chosen topics through playful
            graphics and thoughtful design.
          </p>
          <h2>REBYU Team</h2>
          <div className="profileContainer">
            <AboutProfile
              imageUrl="/images/profiles/profile_aron.png"
              name="Aron"
            ></AboutProfile>
            <AboutProfile
              imageUrl="/images/profiles/profile_alex.png"
              name="Alex"
            ></AboutProfile>
            <AboutProfile
              imageUrl="/images/profiles/profile_kim.png"
              name="Kim"
            ></AboutProfile>
            <AboutProfile
              imageUrl="/images/profiles/profile_jenny.png"
              name="Jenny"
            ></AboutProfile>
            <AboutProfile
              imageUrl="/images/profiles/profile_hetio.png"
              name="Hetio"
            ></AboutProfile>
          </div>
        </ScrollContainer>
      </MainContainer>
    </Page>
  );
};

export default AboutPage;
