import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';

import NewBookForm from './NewBookForm';

const BookList = (props) => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch("/api/v1/books");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const responseBody = await response.json();
      setBooks(responseBody.books);
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`);

    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  let bookItems = books.map((book) => {
    return (
      <BookItem
        key={book.id}
        book={book}
      />
    );
  });

  return (
    <>
      <h1>My Currently Reading: </h1>
      <h2>{bookItems}</h2>
    </>
  )
}

export default BookList;

