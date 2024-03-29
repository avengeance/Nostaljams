import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button
        onClick={openMenu}
        className="profile-button-logo"
        // style={{ backgroundColor: "transparent" }}
      >
        <i className="fas fa-user-circle" id="profile-button-logo" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-dropdown">
            <li id="username-drop">Welcome, {user.username.toUpperCase()}</li>
            <li id="email-drop">EMAIL: {user.email.toUpperCase()}</li>
            <li id="logout-drop">
              <button onClick={handleLogout}>Log Out</button>
            </li>
            <li className="user-page" id="user-page-drop" onClick={closeMenu}>
              <NavLink to={`/users/${user.id}/songs`}
                className="user-page-link"
              >User Page</NavLink>
            </li>
          </div>
        ) : (
          <>
            <div className="login-button">
              <li id="login-button-drop">
                <OpenModalButton
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
            </div>
            <div className="signup-button">
              <li id="signup-button-drop">
                <OpenModalButton
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
