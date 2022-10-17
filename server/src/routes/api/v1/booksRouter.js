import express from 'express';
import { ValidationError } from 'objection';

import { Book } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const booksRouter = new express.Router();

booksRouter.get('/', async (req, res) => {
  try {
    const books = await Book.query();
    return res.status(200).json({ books: books});
  } catch(error) {
    return res.status(500).json({ errors: error });
  }
});

booksRouter.get('/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.query().findById(bookId);
    return res.status(200).json({ book: book });
  } catch(error) {
    return res.status(500).json({ errors: error });
  }
})

booksRouter.post('/', async (req, res) => {
  const body = req.body;
  const formInput = cleanUserInput(body);

  try {
    const newBook = await Book.query().insertAndFetch(formInput);
    return res.status(201).json({ newBook: newBook });
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
})

export default booksRouter;