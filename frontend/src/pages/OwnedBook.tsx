import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { ownedBooksContext } from "../contexts/OwnedBooksContext";
import { BookForm } from "../components/BookForm";
import defaultBook from "../assets/defaultBook.svg";
import { deleteOwnedBook } from "../services/ownedBookServices";
import { bookActionTypes } from "../reducers/ownedBooksReducer";

export const OwnedBook = () => {
  const { id } = useParams<{ id: string }>();
  const { ownedBooks, ownedBooksDispatch } = useContext(ownedBooksContext);
  const navigate = useNavigate();

  if (!id) return <div className="container">Bok-ID ej hittat</div>;
  const selectedBook = ownedBooks.find((b) => b._id === id);
  const handleClick = async () => {
    const deleted = await deleteOwnedBook(id);
    alert(`Du har tagit bort ${deleted.title}`);
    setTimeout(() => navigate("/dashboard"), 20);
    ownedBooksDispatch({ type: bookActionTypes.DELETED, payload: id });
  };

  if (!selectedBook) return <h1 className="container">Ingen bok :(</h1>;
  else
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <h1>{selectedBook.title}</h1>
              <h2>{selectedBook.author}</h2>
              <img
                src={
                  selectedBook.imageUrl !== ""
                    ? selectedBook.imageUrl
                    : defaultBook
                }
                alt={selectedBook.title}
              />

              <p>
                {selectedBook.genre} || {selectedBook.condition}
              </p>
              <p>{selectedBook.description}</p>
            </div>
            <div className="col-12 col-md-6">
              <h1>Redigera bok</h1>
              <BookForm action="put" bookId={id} />

              <h2>Ta bort bok</h2>
              <button onClick={handleClick}>Radera {selectedBook.title}</button>
            </div>
          </div>
        </div>
      </>
    );
};
