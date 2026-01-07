import { PopTrade } from "../models/Trade";
import { TradeCard } from "./TradeCard";

type UserTradesProps = {
  trades: PopTrade[];
  type: "incoming" | "outgoing";
  onRefresh?: () => void;
};

export const UserTrades = ({ trades, type, onRefresh }: UserTradesProps) => {
  const pending = trades.filter((t) => t.status === "pending");
  const declined = trades.filter((t) => t.status === "declined");
  const accepted = trades.filter((t) => t.status === "accepted");

  return (
    <div className="trades-container">
      {/* ej hanterade trade requests */}
      {pending.length !== 0 && (
        <>
          <h2>{type === "incoming" ? "Inkommande bud" : "Skickade bud"}</h2>
          <p>
            {type === "incoming"
              ? "Bytesförfrågningar som gjorts mot dina böcker."
              : "Bytesförfrågningar som du skickat mot andras böcker."}
          </p>
          <div className="row">
            {pending.map((t) => (
              <TradeCard
                key={t._id}
                trade={t}
                type={type}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        </>
      )}
      {accepted.length !== 0 && (
        <>
          <h2>Nya byten</h2>
          <p>
            {type === "incoming"
              ? "Byten som du har accepterat."
              : "Bytesförfrågningar som accepterats av motpart."}{" "}
            Kontakta motparten för att slutföra bytet!
          </p>
          <div className="row">
            {accepted.map((a) => (
              <TradeCard key={a._id} trade={a} type={type} />
            ))}
          </div>
        </>
      )}
      {/* nekade trade requests */}
      {declined.length !== 0 && (
        <>
          <h2>Nekade bud</h2>
          <p>
            {type === "incoming"
              ? "Bud som du nekat"
              : "Bud som har nekats av mottagare"}
          </p>
          <div className="row">
            {declined.map((d) => (
              <TradeCard key={d._id} trade={d} type={type} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
