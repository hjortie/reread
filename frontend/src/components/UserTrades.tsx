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
          <h2>
            {type === "incoming"
              ? "Inkommande bytesförfrågningar"
              : "Skickade bytesförfrågningar"}
          </h2>
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
          <h2>
            {type === "incoming"
              ? "Nya byten"
              : "Accepterade bytesförfrågningar"}
          </h2>
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
          <h2>
            {type === "incoming"
              ? "Bud som du nekat"
              : "Budförfrågningar som har nekats av mottagare"}
          </h2>
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
