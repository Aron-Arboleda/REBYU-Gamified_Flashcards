import React, { useState } from "react";
import "./SideBar.css"; // CSS styles
import { useNavigate } from "react-router-dom";

const SideBar = ({ clickedMenu, setClickedMenu }) => {
  const navigate = useNavigate();

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setClickedMenu(false);
  };

  // Close sidebar when menu item is clicked
  const handleMenuItemClick = (url) => {
    setClickedMenu(false);
    navigate(url);
  };

  return (
    <div className="container">
      <div className={`sidebar ${clickedMenu ? "open" : "closed"}`}>
        <div className="menu_title_container">
          <div className="menu_container" onClick={() => toggleSidebar()}>
            <img src="/images/pixel_art_graphics/UIs/menu_button.png" alt="" />
          </div>
          <div className="title_container">
            <img
              src="/images/pixel_art_graphics/backgrounds/title_without_card.png"
              alt=""
            />
          </div>
        </div>
        <ul className="menu-list">
          <li onClick={() => handleMenuItemClick("/")}>Game Screen</li>
          <li onClick={() => handleMenuItemClick("/dashboard")}>Dashboard</li>
          <li onClick={() => handleMenuItemClick("/edit_deck/new")}>Create</li>
          <li onClick={() => handleMenuItemClick("/decks")}>Decks</li>
          <li onClick={() => handleMenuItemClick("/about")}>About</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
