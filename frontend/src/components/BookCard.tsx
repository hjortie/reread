import { Book } from "../models/Book";
import defaultBook from "../assets/defaultBook.svg";
import { Link } from "react-router";

type BookViewProps = {
  book: Book;
};
export const BookCard = (props: BookViewProps) => {
  return (
    <>
      <div className="book-container col-4 col-md-3 col-lg-2">
        <Link
          className="book-card"
          to={`/dashboard/my-books/${String(props.book._id)}`}
        >
          <div className="book-card__img">
            <img
              src={
                props.book.imageUrl != "" ? props.book.imageUrl : defaultBook
              }
              alt={props.book.title}
            />
          </div>

          <strong>{props.book.title}</strong>
          <p>{props.book.author}</p>
        </Link>
      </div>
    </>
  );
};
