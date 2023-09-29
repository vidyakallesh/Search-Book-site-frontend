import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";

import { SavedBooks } from "./Pages/Saved-books";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./Pages/Login";
import Footer from "./components/footer/Footer";
import Register from "./Pages/Register";
function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/savedBooks" element={<SavedBooks />} />
					<Route path="/login" element={<Login />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
