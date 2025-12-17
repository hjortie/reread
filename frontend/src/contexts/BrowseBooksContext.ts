import { createContext, type Dispatch } from "react";
import { Book } from "../models/Book";
import { BookAction } from "../reducers/ownedBooksReducer";

type booksContextType = {
  books: Book[];
  booksDispatch: Dispatch<BookAction>;
};

export const booksContext = createContext<booksContextType>({
  books: [],
  booksDispatch: () => {},
});
