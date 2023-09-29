import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import "./home.css";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
	const [book, setBook] = useState("");
	const apiKey = "AIzaSyASWiBwsV51cQ9yuyUWOuEN5xi-wpw_ROw";
	const [searchs, setSearch] = useState([]);
	const [savedBooks, setSavedBooks] = useState([]);
	const [cookies] = useCookies(["access_token"]);
	const userID = useGetUserID();

	useEffect(() => {
		if (userID) {
			Axios.get(
				`https://book-app-backend-pylt.onrender.com/book/books/${userID}`
			)
				.then((res) => {
					setSavedBooks(res.data.savedBooks);
				})
				.catch((error) => {
					console.error("Error retrieving saved books:", error);
				});
		}
	}, [userID]);

	function handleChange(event) {
		setBook(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		Axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}`
		)
			.then((res) => {
				setSearch(res.data.items);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const getButtonText = (book) => {
		const savedBook = savedBooks.find(
			(savedBook) =>
				savedBook.title === book.volumeInfo.title &&
				savedBook.description === book.volumeInfo.description &&
				savedBook.userID === userID
		);

		if (savedBook) {
			return "Reading";
		} else {
			return "Save Book";
		}
	};

	const handleSaveBook = (book) => {
		const {
			volumeInfo: {
				title,
				description,
				imageLinks: { thumbnail },
			},
		} = book;

		const authors = book.volumeInfo.authors;

		if (!title || !description) {
			console.error("Title and description are required");
			return;
		}

		const imageLink = thumbnail || "";

		const newBook = {
			title,
			description,
			authors: authors ? authors.join(", ") : "",
			imageLink,
		};

		Axios.put(
			`https://book-app-backend-pylt.onrender.com/book/savedbooks/${userID}`,
			newBook
		)
			.then((res) => {
				console.log("Book saved successfully");
				setSavedBooks((prevBooks) => [...prevBooks, newBook]);
			})
			.catch((error) => {
				console.error("Error saving book:", error);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{!cookies.access_token ? (
					<div>
						<div className="home-back"></div>
					</div>
				) : (
					<div>
						<input
							className="search-input"
							type="text"
							placeholder="Search Book"
							onChange={handleChange}
						/>
						<button type="submit">Search</button>
					</div>
				)}
			</form>
			<div className="books-Container">
				{searchs.map((search) => {
					const id = search.id;
					const image = search.volumeInfo?.imageLinks?.thumbnail;
					const title = search.volumeInfo.title;
					return (
						<div key={id} className="fetch-book">
							<img className="book-img" src={image} alt={title} />
							<h4>{title}</h4>
							<button onClick={() => handleSaveBook(search)}>
								{getButtonText(search)}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};
