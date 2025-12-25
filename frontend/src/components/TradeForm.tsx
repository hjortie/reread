import { useEffect, useState } from "react";
import { getOwnedBooks } from "../services/bookServices";
import { Book } from "../models/Book";
import { createTrade } from "../services/tradeServices";

type TradeFormProps = {
  bookId: string;
};
export const TradeForm = (props: TradeFormProps) => {
  const [ownedBooks, setOwnedBooks] = useState<Book[]>([]);
  const [fetched, setFetched] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const books = await getOwnedBooks();
        setOwnedBooks(books);
      } catch (error) {
        console.error(error);
      } finally {
        setFetched(true);
      }
    };
    if (!fetched) {
      load();
    }
  }, [fetched]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSelectedBooks((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooks.length === 0) return;
    try {
      const trade = await createTrade(props.bookId, selectedBooks);
      console.log(trade);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form id="trade-form" onSubmit={handleSubmit} action="post">
        <p>Välj en eller flera av dina böcker att erbjuda i utbyte mot boken</p>
        {ownedBooks.map((b) => {
          return (
            <div key={b._id}>
              <input
                id={b._id}
                type="checkbox"
                checked={selectedBooks.includes(b._id)}
                onChange={handleCheckboxChange}
              ></input>
              <label htmlFor={b._id}>{b.title}</label>
            </div>
          );
        })}

        <button className="theme-btn" disabled={selectedBooks.length === 0}>
          Skicka bytesförfrågan
        </button>
      </form>
    </>
  );
};
