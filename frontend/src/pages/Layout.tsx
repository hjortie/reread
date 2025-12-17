import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ownedBooksContext } from "../contexts/OwnedBooksContext";
import { getOwnedBooks } from "../services/ownedBookServices";
import {
  bookActionTypes,
  OwnedBookReducer,
} from "../reducers/ownedBooksReducer";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { User } from "../models/User";

const API_BASE = import.meta.env.VITE_API_URL;

export const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const [ownedBooks, ownedBooksDispatch] = useReducer(OwnedBookReducer, []);

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

  return (
    <>
      <main id="app">
        <ownedBooksContext.Provider
          value={{ ownedBooks, ownedBooksDispatch: ownedBooksDispatch }}
        >
          <Header />

          <Outlet />

          <Footer />
        </ownedBooksContext.Provider>
      </main>
    </>
  );
};
