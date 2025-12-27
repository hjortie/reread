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

  return (
    <div className="trades-container">
      <h2>
        {type === "incoming"
          ? "Inkommande bytesförfrågningar"
          : "Skickade bytesförfrågningar"}
      </h2>
      <div className="row">
        {pending.map((t) => (
          <TradeCard key={t._id} trade={t} type={type} onRefresh={onRefresh} />
        ))}
      </div>
      {declined.length !== 0 && (
        <>
          <h2>Nekade bud</h2>
          <div className="row">
            {declined.map((d) => (
              <TradeCard key={d._id} trade={d} type={"outgoing"} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
