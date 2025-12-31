import { PopTrade } from "../models/Trade";
import defaultBook from "../assets/defaultBook.svg";
import { useState } from "react";
import { respondToTrade } from "../services/tradeServices";

type TradeCardProps = {
  trade: PopTrade;
  type: "incoming" | "outgoing";
  onRefresh?: () => void;
};

export const TradeCard = ({ trade, type, onRefresh }: TradeCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [chosenId, setChosenId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  //Modalfunktioner
  const open = () => {
    setShowModal(true);
  };
  const close = () => {
    setShowModal(false);
    setChosenId("");
  };

  const onAccept = async () => {
    if (!chosenId) return;
    setSubmitting(true);
    try {
      await respondToTrade(trade._id, "accept", chosenId);
      onRefresh?.();
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onDecline = async () => {
    setSubmitting(true);
    try {
      await respondToTrade(trade._id, "decline");
      onRefresh?.();
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="col-6 col-md-3 col-lg-2" key={trade._id}>
      <div className="trade-card">
        <h3>{trade.requestedBook.title}</h3>
        <div className="row">
          <div className="trade-card__book-img">
            <img
              src={
                trade.requestedBook.imageUrl !== ""
                  ? trade.requestedBook.imageUrl
                  : defaultBook
              }
            />
          </div>
          <div className="trade-card__book-img">
            <img
              src={
                trade.offeredBooks[0].imageUrl !== ""
                  ? trade.offeredBooks[0].imageUrl
                  : defaultBook
              }
            />
          </div>
          {trade.offeredBooks.length > 1 ? (
            <p>Erbjudna böcker:</p>
          ) : (
            <p>Erbjuden bok:</p>
          )}
          {trade.offeredBooks.map((b) => (
            <p key={b._id}>{b.title}</p>
          ))}
        </div>

        {/* inkommande byten */}
        {type === "incoming" &&
          (trade.status === "pending" ? (
            <div>
              <button className="theme-btn" onClick={open}>
                Besvara förfrågan
              </button>
            </div>
          ) : trade.status === "accepted" ? (
            <div>
              {typeof trade.requesterId !== "string" && (
                <a href={`mailto:${trade.requesterId.email}`}>
                  Kontakta avsändaren
                </a>
              )}
            </div>
          ) : null)}

        {/* utgående byten */}
        {type === "outgoing" &&
          (trade.status === "pending" ? (
            <div>
              <button className="theme-btn" disabled>
                Inväntar svar
              </button>
            </div>
          ) : trade.status === "accepted" ? (
            <div>
              {typeof trade.receiverId !== "string" && (
                <a href={`mailto:${trade.receiverId.email}`}>
                  Kontakta mottagaren
                </a>
              )}
            </div>
          ) : null)}
      </div>

      {/* Modal - UI för att besvara förfrågan */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={showModal ? "false" : "true"}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={close}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="modal-title">Besvara bytesförfrågan</h4>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={close}
              />
            </div>
            <div className="modal-body">
              <p>Begärd bok: {trade.requestedBook.title}</p>
              <p className="mb-2">Erbjudna böcker:</p>
              {trade.offeredBooks.map((b) => (
                <div className="form-check" key={b._id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="chosen-offer"
                    id={`offer-${b._id}`}
                    value={b._id}
                    checked={chosenId === b._id}
                    onChange={(e) => setChosenId(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`offer-${b._id}`}
                  >
                    {b.title} — {b.author}
                  </label>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="theme-btn"
                disabled={!chosenId || submitting}
                onClick={onAccept}
              >
                Acceptera
              </button>
              <button
                className="theme-btn"
                disabled={submitting}
                onClick={onDecline}
              >
                Avböj
              </button>
              <button className="btn btn-link" onClick={close}>
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-backdrop fade show" onClick={close} />
      )}
    </div>
  );
};
