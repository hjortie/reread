import { model, Schema, Types } from "mongoose";

export interface Trade {
  _id: Types.ObjectId;
  requesterId: Types.ObjectId; // User
  receiverId: Types.ObjectId; // User
  offeredBooks: Types.ObjectId[]; //Book
  requestedBook: Types.ObjectId; //Book
  status: "pending" | "accepted" | "declined" | "completed";
}

const tradeSchema = new Schema<Trade>({
  requesterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  offeredBooks: [{ type: Schema.Types.ObjectId, ref: "Book", required: true }],
  requestedBook: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "completed"],
    default: "pending",
    required: true,
  },
});

export const TradeModel = model<Trade>("Trade", tradeSchema);
