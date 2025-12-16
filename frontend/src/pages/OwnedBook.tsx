import { useContext } from "react";
import { useParams } from "react-router";
import { ownedBooksContext } from "../contexts/OwnedBooksContext";
import { BookForm } from "../components/BookForm";

export const OwnedBook = () => {
  const { id } = useParams<{ id: string }>();
  const { ownedBooks } = useContext(ownedBooksContext);

  const selectedBook = ownedBooks.find((b) => b._id === id);
  console.log(selectedBook, id, ownedBooks);

  if (!selectedBook) return <h1 className="container">Ingen bok :(</h1>;
  else
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <h1>{selectedBook.title}</h1>
            </div>
            <div className="col-12 col-md-6">
              <h1>Redigera bok</h1>
              <BookForm action="put" bookId={id} />
            </div>
          </div>
        </div>
      </>
    );
};
