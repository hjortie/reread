import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../contexts/BooksContext";
import { BookCard } from "../components/BookCard";
import { BookInfoForm } from "../components/BookInfoForm";
import { useMe } from "../hooks/useMe";
import { PopTrade } from "../models/Trade";
import { UserTrades } from "../components/UserTrades";
import { getTrades } from "../services/tradeServices";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const { books } = useContext(BooksContext);
  const [fetched, setFetched] = useState(false);
  const [incomingTrades, setIncomingTrades] = useState<PopTrade[]>([]);
  const [outgoingTrades, setOutgoingTrades] = useState<PopTrade[]>([]);
  const { user, error } = useMe();
  const navigate = useNavigate();

  const refreshTrades = async () => {
    const data = await getTrades();
    setIncomingTrades(data.incoming);
    setOutgoingTrades(data.outgoing);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const ownedBooks = books.filter((b) => b.ownerId === user?._id);
  useEffect(() => {
    const load = async () => {
      try {
        const trades = await getTrades();
        setIncomingTrades(trades.incoming);
        setOutgoingTrades(trades.outgoing);
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

  if (!user)
    return (
      <div className="dashboard container">
        <h1>Du är inte inloggad</h1>
        <button className="theme-btn" onClick={handleLoginClick}>
          Logga in
        </button>
        <button className="theme-btn" onClick={handleRegisterClick}>
          Registrera dig
        </button>
        {error && <span>{error}</span>}
      </div>
    );
  else
    return (
      <>
        <div className="dashboard container">
          <h1>{`Hej ${user.username}`}</h1>
          {error && <span>{error}</span>}

          {incomingTrades.length !== 0 && (
            <UserTrades
              trades={incomingTrades}
              type="incoming"
              onRefresh={refreshTrades}
            />
          )}
          {outgoingTrades.length !== 0 && (
            <UserTrades
              trades={outgoingTrades}
              type="outgoing"
              onRefresh={refreshTrades}
            />
          )}

          <div className="books-container row">
            <h2>Dina böcker</h2>
            {ownedBooks.map((book) => (
              <BookCard book={book} key={book._id} />
            ))}
          </div>

          <h2>Lägg till fler böcker</h2>
          <BookInfoForm action="post" />
        </div>
      </>
    );
};
