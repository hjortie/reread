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

    //hindra flera requests för samma användare + bok
    const tradeExists = await Trade.exists({
      requesterId: new Types.ObjectId(userId),
      requestedBook: new Types.ObjectId(bookId),
      status: "pending",
    });
    if (tradeExists)
      throw new Error("A pending trade for this book already exists");

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
    throw error;
  }
};

export const getTrades = async (userId: string) => {
  try {
    const trades = await Trade.find({ receiverId: userId })
      .populate("requestedBook", "_id title author imageUrl condition genre")
      .populate("offeredBooks", "_id title author imageUrl condition genre");

    return trades as TradeType[];
  } catch (error) {
    console.error(error);
  }
};
