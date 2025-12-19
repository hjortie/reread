import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { BooksContext } from "../contexts/BooksContext";
import defaultBook from "../assets/defaultBook.svg";
import { useMe } from "../hooks/useMe";
import { BookEdit } from "../components/BookEdit";

export const Book = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useContext(BooksContext);
  const navigate = useNavigate();
  const { user, fetched } = useMe();

  if (!id) return <div className="container">Bok-ID ej hittat</div>;
  if (!fetched) return <div className="container">Laddar...</div>;

  const selectedBook = books.find((b) => b._id === id);

  const handleLoginClick = () => {
    navigate("/login");
  };

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
                <button onClick={handleLoginClick} className="theme-btn">
                  Logga in
                </button>
              </div>
            ) : user?._id === selectedBook.ownerId ? (
              <BookEdit book={selectedBook} />
            ) : (
              <div className="col-12 col-md-6">
                <h1>Lägg ett bud</h1>
                Här ska det bo ett formulär för att skapa trade-requests
              </div>
            )}
          </div>
        </div>
      </>
    );
};
