import { PopTrade } from "../models/Trade";
import { TradeCard } from "./TradeCard";

type UserTradesProps = {
  trades: PopTrade[];
  type: "incoming" | "outgoing";
};

export const UserTrades = ({ trades, type }: UserTradesProps) => {
  return (
    <div className="trades-container">
      <h2>
        {type === "incoming"
          ? "Inkommande bytesförfrågningar"
          : "Skickade bytesförfrågningar"}
      </h2>
      <div className="row">
        {trades.map((t) => (
          <TradeCard key={t._id} trade={t} />
        ))}
      </div>
    </div>
  );
};
