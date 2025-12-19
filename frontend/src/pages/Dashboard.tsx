import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";
import { BookCard } from "../components/BookCard";
import { BookInfoForm } from "../components/BookInfoForm";
import { useMe } from "../hooks/useMe";

export const Dashboard = () => {
  const { books } = useContext(BooksContext);
  const { user, fetched, error } = useMe();

  const ownedBooks = books.filter((b) => b.ownerId === user?._id);

  if (!fetched) return <p>laddar...</p>;
  if (!user)
    return (
      <div className="dashboard container">
        <h1>Du är inte inloggad</h1>
        <span>{error ? `${error}` : ``}</span>
      </div>
    );
  else
    return (
      <>
        <div className="dashboard container">
          <h1>{`Hej ${user.username}`}</h1>
          <span>{error ? `${error}` : ``}</span>
          <div className="books-container row">
            <h2>Dina böcker</h2>
            {ownedBooks.map((book) => (
              <BookCard book={book} key={book._id} />
            ))}
          </div>
          <h2>Lägg till fler böcker</h2>
          <BookInfoForm action="post" />
        </div>
      </>
    );
};
