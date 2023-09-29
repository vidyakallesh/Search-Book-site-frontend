import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css";
export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!username || !password) {
			setErrorMessage("Enter Required fields");
			return;
		}

		try {
			const response = await axios.post(
				"https://book-app-backend-pylt.onrender.com/login",
				{
					username,
					password,
				}
			);

			setCookies("access_token", response?.data?.token);
			window.localStorage.setItem("userID", response?.data?.userID);
			navigate("/");
		} catch (err) {
			if (err.response && err.response.data) {
				setErrorMessage(err.response.data.message);
			} else {
				setErrorMessage("An error occurred");
			}
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<h2>Login </h2>
					<div>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<button className="login-but" type="submit">
							Submit
						</button>
					</div>
				</div>
			</form>
			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
		</div>
	);
};
