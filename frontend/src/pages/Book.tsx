import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { BooksContext } from "../contexts/BooksContext";
import defaultBook from "../assets/defaultBook.svg";
import { useMe } from "../hooks/useMe";
import { BookEdit } from "../components/BookEdit";
import { TradeForm } from "../components/TradeForm";
import { UserActions } from "../components/UserActions";
import { getBookById } from "../services/bookServices";
import { Book } from "../models/Book";

export const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useContext(BooksContext);
  const { user } = useMe();
  const [fetchedBook, setFetchedBook] = useState<Book | null>(null);
  const [hasLoadedBook, setHasLoadedBook] = useState(false);

  const selectedBook = books.find((b) => b._id === id);

  //hämta bok om den inte redan är i contexten - t ex om status inte är available
  useEffect(() => {
    if (!id || selectedBook || hasLoadedBook) return;

    const loadBook = async () => {
      try {
        const book = await getBookById(id);

        setFetchedBook(book);
      } catch (error) {
        console.error(error);
      } finally {
        setHasLoadedBook(true);
      }
    };
    loadBook();
  });

  const displayBook = selectedBook ?? fetchedBook;

  if (!id) return <div className="container">Bok-ID ej hittat</div>;
  if (!displayBook) return <h1 className="container">Ingen bok :(</h1>;
  else
    return (
      <>
        <div className="container book">
          <div className="row">
            <div className="col-12 col-md-6">
              <h1>{displayBook.title}</h1>
              <h2>{displayBook.author}</h2>
              <div className="book__img">
                <img
                  src={
                    displayBook.imageUrl !== ""
                      ? displayBook.imageUrl
                      : defaultBook
                  }
                  alt={displayBook.title}
                />
              </div>
              <p>
                {displayBook.genre} || {displayBook.condition}
              </p>
              <p>{displayBook.description}</p>
            </div>
            {!user ? (
              <div className="col-12 col-md-6">
                <h2>Du måste vara inloggad</h2>
                <p>Logga in för att lägga ett bud eller redigera din bok</p>
                <UserActions />
              </div>
            ) : user?._id === displayBook.ownerId ? (
              <BookEdit book={displayBook} />
            ) : displayBook.status === "available" ? (
              <div className="col-12 col-md-6">
                <h1>Lägg ett bud</h1>
                <TradeForm bookId={displayBook._id} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
};
