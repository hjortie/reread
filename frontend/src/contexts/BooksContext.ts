import { createContext, type Dispatch } from "react";
import { Book } from "../models/Book";
import { BookAction } from "../reducers/booksReducer";

type BooksContextType = {
  books: Book[];
  booksDispatch: Dispatch<BookAction>;
};

export const BooksContext = createContext<BooksContextType>({
  books: [],
  booksDispatch: () => {},
});
