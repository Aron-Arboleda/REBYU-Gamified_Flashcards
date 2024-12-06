import React, { useEffect, useRef, useState } from "react";
import "./SideBar.css"; // CSS styles
import { useNavigate } from "react-router-dom";

const SideBar = ({ clickedMenu, setClickedMenu }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setClickedMenu(false);
  };

  // Close sidebar when menu item is clicked
  const handleMenuItemClick = (url) => {
    setClickedMenu(false);
    navigate(url);
  };

  // Detect clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setClickedMenu(false); // Close sidebar if clicked outside
        console.log("Clicked outside");
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setClickedMenu]);

  return (
    <div className="container">
      <div
        ref={sidebarRef}
        className={`sidebar ${clickedMenu ? "open" : "closed"}`}
      >
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
