import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import ErrorList from './layout/ErrorList.js';
import translateServerErrors from '../services/translateServerErrors.js';

const NewBookForm = (props) => {
  const [bookRecord, setBookRecord] = useState({
    title: "",
    author: ""
  });

const [errors, setErrors] = useState([]);
const [shouldRedirect, setShouldRedirect] = useState(false);

const addNewBook = async () => {
  try {
    const response = await fetch("/api/v1/books", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(bookRecord)
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json();
        const newErrors = translateServerErrors(body.errors);
        return setErrors(newErrors);
      } else {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw(error);
      }
    } else {
      const body = await response.json();
      console.log("Book posted successfully!", body);
      setShouldRedirect(true);
    }
  } catch(error) {
    console.error(`Error in fetch: ${err.message}`);
  }
}

const handleBookChange = (event) => {
  const targetInput = event.currentTarget
  let value

  if (targetInput.type === "checkbox") {
    value = targetInput.checked;
  } else {
    value = targetInput.value;
  }

  setBookRecord({
    ...bookRecord, 
    [event.currentTarget.name]: value
  })
}

const handleBookSubmit = (event) => {
  event.preventDefault()
  addNewBook()
}

if (shouldRedirect) {
  return <Redirect push to='/books' />
}

console.log(errors)

return (
  <form onSubmit={handleBookSubmit}>
    <h1>Add a New Book:</h1>
    <ErrorList errors={errors} />
    <label htmlFor="title">Title
      <input 
        id="title"
        type="text"
        name="title"
        onChange={handleBookChange}
        value={bookRecord.title}
      />
    </label>
    <label htmlFor="author">Author 
      <input 
        id="author"
        type="text"
        name="author"
        onChange={handleBookChange}
        value={bookRecord.author}
      />
    </label>

    <input type="submit" value="Add Book" />
  </form>
)

}


export default NewBookForm;