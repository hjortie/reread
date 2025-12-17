import { Book } from "../models/Book";
import { BookAction, bookActionTypes } from "./ownedBooksReducer";

export const booksReducer = (books: Book[], action: BookAction) => {
  let updatedBooks = books;

  switch (action.type) {
    case bookActionTypes.LOADED:
      updatedBooks = action.payload;
      break;

    default:
      updatedBooks = books;
      break;
  }
  return updatedBooks;
};
