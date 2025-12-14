import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { User } from "../models/User";
import { ownedBooksContext } from "../contexts/OwnedBooksContext";
import {
  bookActionTypes,
  OwnedBookReducer,
} from "../reducers/ownedBooksReducer";
import { getOwnedBooks } from "../services/ownedBookServices";
const API_BASE = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const [ownedBooks, ownedBooksDispatch] = useReducer(OwnedBookReducer, []);

  useEffect(() => {
    if (fetched) return;
    const load = async () => {
      try {
        const me = await axios.get(`${API_BASE}/me`, {
          withCredentials: true,
        });
        setUser(me.data.user);

        // //hämta böcker till användare
        // const books = await getOwnedBooks();
        // console.log(books);

        // ownedBooksDispatch({
        //   type: bookActionTypes.LOADED,
        //   payload: books,
        // });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setFetched(true);
      }
    };
    load();
  }, [fetched]);

  useEffect(() => {
    //hämta böcker till användare
    if (!user) return;
    try {
      getOwnedBooks().then((books) =>
        ownedBooksDispatch({
          type: bookActionTypes.LOADED,
          payload: books,
        })
      );
    } catch (error: any) {
      setError(error.message);
    }
  }, [user]);

  if (!fetched) return <p>laddar...</p>;
  if (!user) return <h1>Du är inte inloggad</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ownedBooksContext.Provider
        value={{ ownedBooks, ownedBooksDispatch: ownedBooksDispatch }}
      >
        <div className="dashboard container">
          <h1>Hej {user.username}</h1>
          <div className="books-container">
            {ownedBooks.map((book) => (
              <div key={book._id} className="book-container">
                <h2>{book.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </ownedBooksContext.Provider>
    </>
  );
};
