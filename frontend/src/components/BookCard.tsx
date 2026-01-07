import { Book } from "../models/Book";
import defaultBook from "../assets/defaultBook.svg";
import { Link } from "react-router";

type BookViewProps = {
  book: Book;
};
export const BookCard = (props: BookViewProps) => {
  return (
    <>
      <div className="book-container col-6 col-md-3 col-lg-2">
        <Link className="book-card" to={`/book/${String(props.book._id)}`}>
          <div className="book-card__img">
            <img
              src={
                props.book.imageUrl !== ""
                  ? props.book.imageUrl
                  : !props.book.imageUrl
                  ? defaultBook
                  : defaultBook
              }
              className={props.book.imageUrl !== "" ? "cover" : "fill"}
              alt={props.book.title}
            />
          </div>
          <div className="book-card__text">
            <strong>{props.book.title}</strong>
            <p>{props.book.author}</p>
          </div>
          <small>{props.book.condition}</small>
        </Link>
      </div>
    </>
  );
};
