import { Types } from "mongoose";
import { Book } from "../models/Book.js";
import { Trade, type TradeType } from "../models/Trade.js";

export const createTrade = async (
  userId: string,
  bookId: string,
  offer: string[]
) => {
  try {
    const book = await Book.findById(bookId);
    const receiverId = book?.ownerId.toString();
    const offeredIds = offer.map((id) => new Types.ObjectId(id));

    const createdTrade = await Trade.create({
      requesterId: new Types.ObjectId(userId),
      requestedBook: new Types.ObjectId(bookId),
      receiverId: new Types.ObjectId(receiverId),
      offeredBooks: offeredIds,
      status: "pending",
    });

    if (createdTrade) {
      //uppdatera bokens status
      await Book.findByIdAndUpdate(bookId, {
        status: "in-trade",
      });
    }
    return createdTrade as TradeType;
  } catch (error) {
    console.error(error);
  } finally {
  }
};
