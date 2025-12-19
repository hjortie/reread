import { useNavigate } from "react-router";
import { deleteOwnedBook } from "../services/bookServices";
import { BookInfoForm } from "./BookInfoForm";
import { bookActionTypes } from "../reducers/booksReducer";
import { Book } from "../models/Book";
import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

type BookEditProps = {
  book: Book;
};

export const BookEdit = (props: BookEditProps) => {
  const navigate = useNavigate();
  const { booksDispatch } = useContext(BooksContext);

  const handleDeleteClick = async () => {
    const deleted = await deleteOwnedBook(props.book._id);
    alert(`Du har tagit bort ${deleted.title}`);
    setTimeout(() => navigate("/dashboard"), 20);
    booksDispatch({ type: bookActionTypes.DELETED, payload: props.book._id });
  };
  return (
    <div className="col-12 col-md-6">
      <h1>Redigera bok</h1>
      <BookInfoForm action="put" bookId={props.book._id} />
      <h2>Ta bort bok</h2>
      <button onClick={handleDeleteClick}>Radera {props.book.title}</button>
    </div>
  );
};
