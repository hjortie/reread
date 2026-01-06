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
    const ok = window.confirm(
      `Är du säker på att du vill ta bort "${props.book.title}"?`
    );
    if (!ok) return;

    const deleted = await deleteOwnedBook(props.book._id);
    alert(`Du har tagit bort ${deleted.title}`);
    setTimeout(() => navigate("/dashboard"), 20);
    booksDispatch({ type: bookActionTypes.DELETED, payload: props.book._id });
  };
  return (
    <div className="col-12 col-md-6">
      <h1>Redigera bok</h1>
      <p>Du behöver bara fylla i de fält som du vill redigera.</p>
      <BookInfoForm action="put" bookId={props.book._id} />
      <hr />
      <h2>Ta bort bok</h2>
      <p>Radera boken permanent.</p>
      <button onClick={handleDeleteClick} className="warn-btn">
        Radera {props.book.title}
      </button>
    </div>
  );
};
