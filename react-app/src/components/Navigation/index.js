import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation-header">
      <div className="header">
        <ul>
          <div className="home-button">
              <NavLink exact to="/" className="logo-link">
            <li id="home-button">
                <img
                  className="home__button__icon"
                  src="/icons/android-chrome-512x512.png"
                />
            </li>
              </NavLink>
            <div className="create-song">
              {sessionUser && (
                <li id="song-button">
                  <NavLink exact to="/songs/new" className="logo-link">
                    Create Song
                  </NavLink>
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
