import { Book } from "../models/Book";

export enum bookActionTypes {
  ADDED,
  UPDATED,
  DELETED,
  LOADED,
}

export type BookAction = {
  type: bookActionTypes;
  payload: Book[];
};

export const OwnedBookReducer = (books: Book[], action: BookAction): Book[] => {
  let updatedBooks = books;
  switch (action.type) {
    case bookActionTypes.ADDED:
      break;
    case bookActionTypes.UPDATED:
      break;
    case bookActionTypes.DELETED:
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
