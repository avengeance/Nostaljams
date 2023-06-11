import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const MIN_USERNAME_LENGTH = 4;
  const MIN_PASSWORD_LENGTH = 6;

  const validCredential = email.length >= MIN_USERNAME_LENGTH;
  const validPassword = password.length >= MIN_PASSWORD_LENGTH;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(sessionActions.login(email, password));
      if (data && data.errors ) {
        setErrors(data.errors);
      } else {
        setErrors(["The provided credentials are invalid"]);
      }
      if(data.ok){
        closeModal()
      }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(login("demo@aa.io", "password"));
    closeModal()
  }

  return (
    <div className='login-modal'>
      <h1 id='login-text'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="login-form">
          <label id='username-email'>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </label>
          <label id='password'>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
        </div>
        <div id='div-login-submit'>
          <button type="submit"
            id='login-button'
            disabled={!validCredential || !validPassword}
          >Log In</button>
        </div>
        <div className="demo-login">
          <a href="javascript:void(0)"
            onClick={handleDemoLogin}
          >Demo User</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
