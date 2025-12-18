import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../contexts/BooksContext";
import { BookCard } from "../components/BookCard";
import { User } from "../models/User";
import { conditions, genres } from "../components/BookForm";
import { getMe } from "../services/meServices";

export const Browse = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fetched, setFetched] = useState(false);
  const [filters, setFilters] = useState({ q: "", condition: "", genre: "" });
  const { books } = useContext(BooksContext);

  useEffect(() => {
    if (fetched) return;
    const load = async () => {
      try {
        const me = await getMe();
        setUser(me);
      } finally {
        setFetched(true);
      }
    };
    load();
  }, [fetched]);

  let availableBooks = books.filter((book) => book.status === "available");
  if (user) {
    availableBooks = availableBooks.filter((book) => book.ownerId !== user._id);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const hasFilters =
    filters.q.trim().length > 0 || filters.condition || filters.genre;

  if (hasFilters) {
    const qLower = filters.q.trim().toLowerCase();
    availableBooks = availableBooks.filter((book) => {
      const matchesQ = qLower
        ? book.title.toLowerCase().includes(qLower) ||
          book.author.toLowerCase().includes(qLower)
        : true;
      const matchesCondition = filters.condition
        ? book.condition === filters.condition
        : true;
      const matchesGenre = filters.genre ? book.genre === filters.genre : true;
      return matchesQ && matchesCondition && matchesGenre;
    });
  }

  return (
    <>
      <div className="browse container">
        <label htmlFor="search">Sök efter titel/författare</label>
        <input
          type="text"
          name="q"
          id="search"
          onChange={handleChange}
          value={filters.q}
        />
        <label htmlFor="condition">Skick</label>
        <select
          id="condition"
          name="condition"
          value={filters.condition}
          onChange={handleChange}
        >
          <option value="">Välj skick</option>
          {conditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={filters.genre}
          onChange={handleChange}
        >
          <option value="">Välj genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <div className="row">
          {availableBooks.map((book) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      </div>
    </>
  );
};
