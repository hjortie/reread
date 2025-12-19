import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { BooksContext } from "../contexts/BooksContext";
import { BookInfoForm } from "../components/BookInfoForm";
import defaultBook from "../assets/defaultBook.svg";
import { deleteOwnedBook } from "../services/bookServices";
import { bookActionTypes } from "../reducers/booksReducer";
import { useMe } from "../hooks/useMe";

export const Book = () => {
  const { id } = useParams<{ id: string }>();
  const { books, booksDispatch } = useContext(BooksContext);
  const navigate = useNavigate();
  const { user, fetched } = useMe();

  if (!id) return <div className="container">Bok-ID ej hittat</div>;
  if (!fetched) return <div className="container">Laddar...</div>;

  const selectedBook = books.find((b) => b._id === id);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleDeleteClick = async () => {
    const deleted = await deleteOwnedBook(id);
    alert(`Du har tagit bort ${deleted.title}`);
    setTimeout(() => navigate("/dashboard"), 20);
    booksDispatch({ type: bookActionTypes.DELETED, payload: id });
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
                <button onClick={handleLoginClick}>Logga in</button>
              </div>
            ) : user?._id === selectedBook.ownerId ? (
              <div className="col-12 col-md-6">
                <h1>Redigera bok</h1>
                <BookInfoForm action="put" bookId={id} />
                <h2>Ta bort bok</h2>
                <button onClick={handleDeleteClick}>
                  Radera {selectedBook.title}
                </button>
              </div>
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
