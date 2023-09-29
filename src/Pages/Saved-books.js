import { useEffect, useState } from "react";
import { FaTrash, FaBook, FaCheck } from "react-icons/fa";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "./savedbooks.css";

export const SavedBooks = () => {
  const [books, setBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const userId = useGetUserID();

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `https://book-app-backend-pylt.onrender.com/book/books/${userId}`
        );
        setBooks(response.data.savedBooks);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserBooks();
  }, [userId]);  

  const readingCompleted = (bookId) => {
    const bookToMark = books.find((book) => book._id === bookId);
    if (bookToMark) {
      const updatedBook = { ...bookToMark, progress: 100 };
      setFinishedBooks((prevFinishedBooks) => [...prevFinishedBooks, updatedBook]);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    }
  };

  const unRead = async (bookId) => {
    try {
      await axios.delete(`https://book-app-backend-pylt.onrender.com/book/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <div className="saved">
      <h2>Saved-Books</h2>
      <div className="saved-books-container">
        {books.map((book, index) => (
          <div className="saved-book-card" key={`${book._id}-${index}`}>
            <div className="saved-book-content">
              <h3 className="saved-book-title">{book.title}</h3>
              <img
                className="saved-book-image"
                src={book.imageLink}
                alt={book.title}
              />
              <p className="saved-book-description">{book.description}</p>
              <p className="saved-book-author">
                <span style={{ color: "black", fontWeight: "bold", marginLeft: "5px" }}>
                  Author:
                </span>{" "}
                {book.authors ? book.authors.join(", ") : ""}
              </p>
             
            </div>
            <div className="saved-book-sidebar">
              <div className="saved-book-buttons">
                <button
                  className="saved-book-delete-button"
                  onClick={() => unRead(book._id)}
                >
                  <FaTrash />
                </button>
                <div className="tooltip" onClick={() => readingCompleted(book._id)}>
                  <span className="tooltip-text">Finish Reading</span>
                  <FaCheck/>
                </div>
              </div>
            </div>
          </div>
        ))}
     
      <div className="finished-books-container">
        {finishedBooks.map((book, index) => (
          <div className="saved-book-card" key={`${book._id}-${index}`}>
            <div className="saved-book-content">
              <h3 className="saved-book-title">{book.title}</h3>
              <img
                className="saved-book-image"
                src={book.imageLink}
                alt={book.title}
              />
              <p className="saved-book-description">{book.description}</p>
              <p className="saved-book-author">
                <span style={{ color: "black", fontWeight: "bold", marginLeft: "5px" }}>
                  Author:
                </span>{" "}
                {book.authors ? book.authors.join(", ") : ""}
              </p>
            </div>
            <div className="saved-book-sidebar">
            <p className="saved-book-progress">
                Reading Completed 
              </p>
              <button className="saved-book-delete-button" onClick={() => unRead(book._id)}>
                <FaTrash />
              </button>
          
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};