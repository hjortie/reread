import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BooksContext } from "../contexts/BooksContext";
import { getBooks } from "../services/bookServices";
import { booksReducer, bookActionTypes } from "../reducers/booksReducer";
import { useEffect, useReducer } from "react";
import { useMe } from "../hooks/useMe";

export const Layout = () => {
  const { user } = useMe();
  const [books, booksDispatch] = useReducer(booksReducer, []);

  useEffect(() => {
    try {
      getBooks().then((books) =>
        booksDispatch({
          type: bookActionTypes.LOADED,
          payload: books,
        })
      );
    } catch (error: any) {
      console.error(error.message);
    }
  }, [user]);

  return (
    <>
      <main id="app">
        <BooksContext.Provider value={{ books, booksDispatch: booksDispatch }}>
          <Header />
          <Outlet />

          <Footer />
        </BooksContext.Provider>
      </main>
    </>
  );
};
