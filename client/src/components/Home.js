import React from 'react';
import { Link } from 'react-router-dom';

import BookList from './BookList';

const Home = (props) => {
  return (
    <>
      <h1>Welcome to Bookish!</h1>
      <BookList />
      <Link to={`/books/new`}>Add book</Link>
    </>
  )
}

export default Home;