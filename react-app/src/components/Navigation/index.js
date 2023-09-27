import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalLink from "../OpenModalLink";
import CreateSongModal from "../CreateSongModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="navigation-header">
      <div className="header">
        <ul>
          <div className="home-button">
            <div>
              <NavLink exact to="/" className="logo-link">
                <li id="home-button">
                  <img
                    className="home__button__icon"
                    src="/icons/android-chrome-512x512.png"
                  />
                </li>
              </NavLink>
              <NavLink exact to="/about-us" className="about-us-link">
                <li id="about-us-button"/>
                <p>About Us</p>
              </NavLink>
            </div>
            <div className="create-song">
              {sessionUser && (
                <li id="song-button">
                  <OpenModalLink
                    className="logo-link"
                    buttonText="Create Song"
                    onItemClick={closeMenu}
                    modalComponent={<CreateSongModal />}
                  />
                </li>
              )}
            </div>
            {isLoaded && (
              <div className="profile-button">
                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
