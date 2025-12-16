import { createContext, type Dispatch } from "react";
import { Book } from "../models/Book";
import { BookAction } from "../reducers/ownedBooksReducer";

type ownedBooksContextType = {
  ownedBooks: Book[];
  ownedBooksDispatch: Dispatch<BookAction>;
};

export const ownedBooksContext = createContext<ownedBooksContextType>({
  ownedBooks: [],
  ownedBooksDispatch: () => {},
});
