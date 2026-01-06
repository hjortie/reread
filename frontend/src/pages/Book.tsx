import { useContext } from "react";
import { useParams } from "react-router";
import { BooksContext } from "../contexts/BooksContext";
import defaultBook from "../assets/defaultBook.svg";
import { useMe } from "../hooks/useMe";
import { BookEdit } from "../components/BookEdit";
import { TradeForm } from "../components/TradeForm";
import { UserActions } from "../components/UserActions";

export const Book = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useContext(BooksContext);

  const { user, fetched } = useMe();

  if (!id) return <div className="container">Bok-ID ej hittat</div>;
  if (!fetched) return <div className="container">Laddar...</div>;

  const selectedBook = books.find((b) => b._id === id);

  if (!selectedBook) return <h1 className="container">Ingen bok :(</h1>;
  else
    return (
      <>
        <div className="container book">
          <div className="row">
            <div className="col-12 col-md-6">
              <h1>{selectedBook.title}</h1>
              <h2>{selectedBook.author}</h2>
              <div className="book__img">
                <img
                  src={
                    selectedBook.imageUrl !== ""
                      ? selectedBook.imageUrl
                      : defaultBook
                  }
                  alt={selectedBook.title}
                />
              </div>
              <p>
                {selectedBook.genre} || {selectedBook.condition}
              </p>
              <p>{selectedBook.description}</p>
            </div>
            {!user ? (
              <div className="col-12 col-md-6">
                <h2>Du måste vara inloggad</h2>
                <p>Logga in för att lägga ett bud eller redigera din bok</p>
                <UserActions />
              </div>
            ) : user?._id === selectedBook.ownerId ? (
              <BookEdit book={selectedBook} />
            ) : selectedBook.status === "available" ? (
              <div className="col-12 col-md-6">
                <h1>Lägg ett bud</h1>
                <TradeForm bookId={selectedBook._id} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
};
