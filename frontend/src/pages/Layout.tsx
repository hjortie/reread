import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BooksContext } from "../contexts/BooksContext";
import { getBooks } from "../services/bookServices";
import { booksReducer, bookActionTypes } from "../reducers/booksReducer";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { User } from "../models/User";

const API_BASE = import.meta.env.VITE_API_URL;

export const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const [books, booksDispatch] = useReducer(booksReducer, []);
  useEffect(() => {
    //hämta inloggad användare
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

  useEffect(() => {
    try {
      getBooks().then((books) =>
        booksDispatch({
          type: bookActionTypes.LOADED,
          payload: books,
        })
      );
    } catch (error: any) {
      setError(error.message);
    }
  }, [user]);

  if (!fetched) return <p>laddar...</p>;

  return (
    <>
      <main id="app">
        <BooksContext.Provider value={{ books, booksDispatch: booksDispatch }}>
          <Header />
          {fetched ? <span></span> : <span>...laddar</span>}
          <Outlet />

          <Footer />
        </BooksContext.Provider>
      </main>
    </>
  );
};
