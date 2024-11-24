import React from "react";
import Page from "../../components/Page/Page";
import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import ContentArea from "../../components/ContentArea/ContentArea";
import TitleHeading from "../../components/TitleHeading/TitleHeading";
import ScrollContainer from "../../components/ScrollContainer/ScrollContainer";
import { useLocation } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage || "Page not found.";
  const pathName = location.state?.pathName || location.pathname;

  return (
    <Page classList="page pageUnscrollable">
      <Header />
      <MainContainer>
        <ContentArea>
          <TitleHeading titleText="404 Not Found" />
          <h2>The page you are looking for does not exist.</h2>
          <ScrollContainer>
            <h3>Error Info:</h3>
            <ul>
              <li>
                <span>Routing:</span> No match found for <code>{pathName}</code>
              </li>
              <li>
                <span>Message:</span> {errorMessage}
              </li>
            </ul>
          </ScrollContainer>
        </ContentArea>
      </MainContainer>
    </Page>
  );
};

export default NotFoundPage;
