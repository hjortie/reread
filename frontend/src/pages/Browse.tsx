import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../contexts/BooksContext";
import { BookCard } from "../components/BookCard";
import { User } from "../models/User";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const Browse = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fetched, setFetched] = useState(false);
  const { books } = useContext(BooksContext);

  useEffect(() => {
    if (fetched) return;
    const load = async () => {
      try {
        const me = await axios.get(`${API_BASE}/me`, {
          withCredentials: true,
        });
        setUser(me.data.user);
      } catch (error: any) {
        console.error(error);
      } finally {
        setFetched(true);
      }
    };
    load();
  }, [fetched]);

  let availableBooks = books.filter((book) => book.status === "available");

  if (user) {
    availableBooks = books.filter((book) => book.ownerId !== user._id);
  }

  return (
    <>
      <div className="browse container">
        <div className="row">
          {availableBooks.map((book) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
    </>
  );
};
