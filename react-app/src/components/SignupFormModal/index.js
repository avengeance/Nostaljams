import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
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
	const validConfirmPassword = confirmPassword.length >= MIN_CONFIRM_PASSWORD_LENGTH;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(
				signUp(username, email, firstName, lastName, bio, userImage, password) // Include the password parameter
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


	async function checkUsername(username) {
		const response = await fetch(`/api/users/${username}`);
		const data = await response.json();
		if (response.status === 200) {
			setUsernameValid(data.valid);
		}
		else {
			setUsernameValid(false);
		}
	}

	return (
		<div className="signup-modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form">
				<ul>
					{errors.map((error, idx) => (
						<li className='signup-errors' key={idx}>{error}</li>
					))}
				</ul>
				<div className="label-div">
					<label className="label">
						Email
						<input
							className="input"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required

						/>
					</label>
					<label className="label">
						Username
						<input
							className="input"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required

						/>
					</label>
					<label className="label">
						First Name
						<input
							className="input"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
					<label className="label">
						Last Name
						<input
							className="input"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
					<label className="label">
						Bio
						<input
							className="input"
							type="text"
							value={bio}
							onChange={(e) => setBio(e.target.value)}

						/>
					</label>
					<label className="label">
						User Image
					</label>
					<div className="file-input">
						<input
							id="user-image"
							type='file'
							value={userImage}
							onChange={(e) => setUserImage(e.target.value)}
							style={{ display: 'none' }} // Hide the input element
						/>
						<button
							type="button"
							className="choose-file-button"
							onClick={() => {
								// Trigger the file input click event when the button is clicked
								document.getElementById('user-image').click();
							}}
						>
							Choose File
						</button>
					</div>

					<label className="label">
						Password
						<input
							className="input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required

						/>
					</label>
					<label className="label">
						Confirm Password
						<input
							className="input"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit"
					disabled={!validEmail || !validUsername || !validFirstName || !validLastName || !validPassword || !validConfirmPassword}
				>Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
