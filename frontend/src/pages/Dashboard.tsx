import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { ownedBooksContext } from "../contexts/OwnedBooksContext";
import { BookCard } from "../components/BookCard";
import { BookForm } from "../components/BookForm";

const API_BASE = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const { ownedBooks } = useContext(ownedBooksContext);

  useEffect(() => {
    if (fetched) return;
    const load = async () => {
      try {
        const me = await axios.get(`${API_BASE}/me`, {
          withCredentials: true,
        });
        setUser(me.data.user);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setFetched(true);
      }
    };
    load();
  }, [fetched]);

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
          <BookForm action="post" />
        </div>
      </>
    );
};
