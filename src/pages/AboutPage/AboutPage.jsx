import AboutProfile from "../../components/AboutProfile/AboutProfile";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Page from "../../components/Page/Page";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import "./AboutPage.css";
import ContentArea from "../../components/ContentArea/ContentArea";
import TitleHeading from "../../components/TitleHeading/TitleHeading";

const AboutPage = () => {
  return (
    <Page classList="page">
      <Header />
      <MainContainer>
        <ContentArea>
          <TitleHeading titleText="ABOUT" />
          <ScrollContainer>
            <h2 className="about-h2">WHAT IS REBYU?</h2>
            <p className="about-info">
              REBYU (Review, Educate, Boost, Your Understanding) is a
              flashcard-based web app designed to bring a dynamic, game-like
              experience to studying. Much like Quizlet, it allows users to
              create, review, and test themselves with digital flashcards, but
              it stands out by incorporating a vibrant, gamified visual style to
              make learning more engaging and enjoyable. With REBYU, studying
              becomes an interactive journey, encouraging users to progress and
              stay motivated as they explore their chosen topics through playful
              graphics and thoughtful design.
            </p>
            <h2 className="about-h2">REBYU TEAM</h2>
            <div className="profileContainer">
              <AboutProfile
                imageUrl="/images/profiles/profile_aron.png"
                name="Aron"
                label="Developer"
              ></AboutProfile>
              <AboutProfile
                imageUrl="/images/profiles/profile_alex.png"
                name="Alex"
                label="UI/UX Designer"
              ></AboutProfile>
              <AboutProfile
                imageUrl="/images/profiles/profile_kim.png"
                name="Kim"
                label="Project Manager"
              ></AboutProfile>
              <AboutProfile
                imageUrl="/images/profiles/profile_jenny.png"
                name="Jenny"
                label="Documentation"
              ></AboutProfile>
              <AboutProfile
                imageUrl="/images/profiles/profile_hetio.png"
                name="Hetio"
                label="Documentation"
              ></AboutProfile>
            </div>
          </ScrollContainer>
        </ContentArea>
      </MainContainer>
    </Page>
  );
};

export default AboutPage;
