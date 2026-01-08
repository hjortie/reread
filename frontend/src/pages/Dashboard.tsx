import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../contexts/BooksContext";
import { BookCard } from "../components/BookCard";
import { BookInfoForm } from "../components/BookInfoForm";
import { useMe } from "../hooks/useMe";
import { PopTrade } from "../models/Trade";
import { UserTrades } from "../components/UserTrades";
import { getTrades } from "../services/tradeServices";
import { UserActions } from "../components/UserActions";
import { CTABlock } from "../components/CTABlock";

export const Dashboard = () => {
  const { books } = useContext(BooksContext);
  const [fetched, setFetched] = useState(false);
  const [incomingTrades, setIncomingTrades] = useState<PopTrade[]>([]);
  const [outgoingTrades, setOutgoingTrades] = useState<PopTrade[]>([]);
  const { user, error } = useMe();

  const refreshTrades = async () => {
    const data = await getTrades();
    setIncomingTrades(data.incoming);
    setOutgoingTrades(data.outgoing);
  };

  const ownedBooks = books.filter((b) => b.ownerId === user?._id);
  useEffect(() => {
    const load = async () => {
      if (!user) {
        setIncomingTrades([]);
        setOutgoingTrades([]);
        return;
      }
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
  }, [user]);

  if (!user)
    return (
      <div className="dashboard container">
        <h1>Du är inte inloggad</h1>
        <UserActions />
        {error && <span>{error}</span>}
      </div>
    );
  else
    return (
      <>
        <div className="dashboard container">
          <h1>{`Hej ${user.username}`}</h1>
          <p>
            Här kan du se och hantera byteshändelser och böcker i ditt
            bibliotek.
          </p>
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

          <CTABlock />

          <div className="books-container">
            <h2>Dina böcker</h2>
            <div className="row">
              {ownedBooks.length >= 1 ? (
                ownedBooks.map((book) => (
                  <BookCard book={book} key={book._id} />
                ))
              ) : (
                <p>
                  Du behöver lägga till böcker här för att kunna skapa byten.
                </p>
              )}
            </div>
          </div>

          <h2>Lägg till fler böcker</h2>
          <BookInfoForm action="post" />
        </div>
      </>
    );
};
