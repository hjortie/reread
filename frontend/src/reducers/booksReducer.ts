import { Book } from "../models/Book";

export enum bookActionTypes {
  ADDED,
  UPDATED,
  DELETED,
  LOADED,
}

export type BookAction =
  | { type: bookActionTypes.LOADED; payload: Book[] }
  | { type: bookActionTypes.ADDED; payload: Book }
  | { type: bookActionTypes.UPDATED; payload: { _id: string } & Partial<Book> }
  | { type: bookActionTypes.DELETED; payload: Book["_id"] };

export const booksReducer = (books: Book[], action: BookAction): Book[] => {
  let updatedBooks = books;
  switch (action.type) {
    case bookActionTypes.ADDED:
      updatedBooks = [...books, action.payload];
      break;
    case bookActionTypes.UPDATED:
      updatedBooks = books.map((b) =>
        b._id === action.payload._id ? { ...b, ...action.payload } : b
      );

      break;
    case bookActionTypes.DELETED:
      updatedBooks = books.filter((b) => b._id !== action.payload);

      break;
    case bookActionTypes.LOADED:
      updatedBooks = action.payload;

      break;

    default:
      updatedBooks = books;
      break;
  }

  return updatedBooks;
};
