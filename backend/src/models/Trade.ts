import { model, Schema, Types, type InferSchemaType } from "mongoose";

const tradeSchema = new Schema({
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

export const Trade = model("Trade", tradeSchema);

type TradeSchemaType = InferSchemaType<typeof tradeSchema>;
export type TradeType = TradeSchemaType & { _id: Types.ObjectId };
