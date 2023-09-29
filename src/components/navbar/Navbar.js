import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const logout = () => {
		setCookies("access_token", "");
		window.localStorage.removeItem("userID");
		navigate("/");
	};

	return (
		<div className="navbar">
			<div className="navbar-item1">
				<Link to="/">Book-Store</Link>
			</div>

			<div className="navbar-item2">
				{!cookies.access_token ? (
					<div className="nav-link" style={{ marginRight: "30px" }}>
						<div className="button-container">
							{" "}
							{/* Added a div with a class name */}
							<Link to="/register">Signup</Link>
							<Link to="/login">Login</Link>
						</div>
					</div>
				) : (
					<div>
						<Link to="/savedbooks">Saved-Books</Link>
						<button onClick={logout}>LogOut</button>
					</div>
				)}
			</div>
		</div>
	);
};
