import React from "react";
import "./StartingPage.css";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page/Page";

const StartingPage = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <div className="center_x_y_container">
        <div className="titleREBYU"></div>
        <button id="startButton" onClick={() => navigate("/login")}></button>
      </div>
    </Page>
  );
};

export default StartingPage;
