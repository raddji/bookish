import React, { useState, useEffect } from 'react';

const BookShow = (props) => {
  const [book, setBook] = useState({});

  const getBook = async () => {
    try {
      const bookId = props.match.params.id;
      const response = await fetch(`/api/v1/books/${bookId}`);

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw(error);
      }
      const responseBody = await response.json();
      setBook(responseBody.book);
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  useEffect(() => {
    getBook();
  }, []);


  return (
    <>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>This will be the best book application!</p>
    </>
  )
}

export default BookShow