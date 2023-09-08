import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp, checkUsername } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [userImage, setUserImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const [usernameValid, setUsernameValid] = useState(false);
  const usernameExists = useSelector((state) => state.session.usernameExists);

  const MIN_FIRSTNAME_LENGTH = 2;
  const MIN_LASTNAME_LENGTH = 2;
  const MIN_EMAIL_LENGTH = 5;
  const MIN_USERNAME_LENGTH = 4;
  const MIN_PASSWORD_LENGTH = 6;
  const MIN_CONFIRM_PASSWORD_LENGTH = 6;

  const validFirstName = firstName.length >= MIN_FIRSTNAME_LENGTH;
  const validLastName = lastName.length >= MIN_LASTNAME_LENGTH;
  const validEmail = email.length >= MIN_EMAIL_LENGTH;
  const validUsername = username.length >= MIN_USERNAME_LENGTH;
  const validPassword = password.length >= MIN_PASSWORD_LENGTH;
  const validConfirmPassword =
    confirmPassword.length >= MIN_CONFIRM_PASSWORD_LENGTH;
  useEffect(() => {
    if (username) {
      dispatch(checkUsername(username)).then((exists) => {
        setUsernameValid(!exists);
      });
    }
  }, [dispatch, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(
          username.toLowerCase(),
          email,
          firstName,
          lastName,
          bio,
          userImage,
          password
        ) // Include the password parameter
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signup-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <ul>
          {errors.map((error, idx) => (
            <li className="signup-errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <div className="label-div">
          <label className="label">
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </label>
          <label className="label">
            <input
              className={`input ${usernameExists ? "invalid" : ""}`}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
            />
            {usernameExists && (
              <p className="error-message">Username already exists.</p>
            )}
          </label>
          {/* <label className="label">
						Username
						<input
							className="input"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label> */}
          <label className="label">
            <input
              className="input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </label>
          <label className="label">
            <input
              className="input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </label>

          <label className="label">
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </label>
          <label className="label">
            <input
              className="input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </label>
          <label className="label">
            <input
              className="input"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </label>
          <div className="file-input">
            <label className="label">User Image</label>
            <input
              id="user-image"
              type="file"
              value={userImage}
              onChange={(e) => setUserImage(e.target.value)}
              style={{ display: "none", outline: "none", borderRadius: "5px" }} // Hide the input element
            />
            <button
              type="button"
              className="choose-file-button"
              onClick={() => {
                // Trigger the file input click event when the button is clicked
                document.getElementById("user-image").click();
              }}
            >
              Choose File
            </button>
          </div>
        </div>
        <div id="signup-submit-div">
          <button
            type="submit"
            id="signup-submit"
            disabled={
              !validEmail ||
              !validUsername ||
              !validFirstName ||
              !validLastName ||
              !validPassword ||
              !validConfirmPassword
            }
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
