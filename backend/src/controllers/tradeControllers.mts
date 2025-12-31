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
      requesterId: userId,
      requestedBook: bookId,
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
      await Book.updateMany(
        { _id: { $in: offeredIds } },
        {
          $set: { status: "in-trade" },
        }
      );
    }
    return createdTrade as TradeType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrades = async (
  userId: string
): Promise<{ incoming: TradeType[]; outgoing: TradeType[] }> => {
  try {
    const incomingTrades = await Trade.find({ receiverId: userId })
      .populate("requestedBook", "_id title author imageUrl condition genre")
      .populate("offeredBooks", "_id title author imageUrl condition genre")
      .populate("requesterId", "_id email username")
      .populate("receiverId", "_id email username");

    const outgoingTrades = await Trade.find({ requesterId: userId })
      .populate("requestedBook", "_id title author imageUrl condition genre")
      .populate("offeredBooks", "_id title author imageUrl condition genre")
      .populate("requesterId", "_id email username")
      .populate("receiverId", "_id email username");
    return {
      incoming: incomingTrades as TradeType[],
      outgoing: outgoingTrades as TradeType[],
    };
  } catch (error) {
    console.error(error);
    throw Error;
  }
};

export const respondToRequest = async (
  tradeId: string,
  action: "accept" | "decline",
  chosenOfferedBookId?: string
) => {
  try {
    const trade = await Trade.findById(tradeId).populate(
      "requestedBook",
      "_id title author imageUrl condition genre"
    );
    if (!trade) throw new Error("Trade not found");

    //hantera trade-objektets uppdatering vid decline
    if (action === "decline") {
      const declinedTrade = await Trade.findByIdAndUpdate(
        tradeId,
        {
          $set: { status: "declined", acceptedOfferedBook: null },
        },
        { new: true }
      );
      //uppdatera requested book + offeredBooks status
      if (declinedTrade) {
        await Book.findByIdAndUpdate(trade.requestedBook._id, {
          $set: { status: "available" },
        });
        await Book.updateMany(
          { _id: { $in: trade.offeredBooks } },
          {
            $set: { status: "available" },
          }
        );
      }
      return declinedTrade as TradeType;
    } else if (action === "accept") {
      //uppdatera trade objekt vid accept (kräver vald accepterad bok)
      if (!chosenOfferedBookId)
        throw new Error("Missing chosen offered book to accept");

      const acceptedTrade = await Trade.findByIdAndUpdate(
        tradeId,
        {
          $set: {
            status: "accepted",
            acceptedOfferedBook: chosenOfferedBookId,
          },
        },
        { new: true }
      );

      if (acceptedTrade) {
        const unchosenBooks = trade.offeredBooks.filter(
          (b) => b.toString() !== chosenOfferedBookId
        );
        //hantera bokuppdateringar
        await Book.findByIdAndUpdate(trade.requestedBook._id, {
          $set: { status: "unavailable" },
        });
        await Book.findByIdAndUpdate(chosenOfferedBookId, {
          $set: { status: "unavailable" },
        });
        await Book.updateMany(
          { _id: { $in: unchosenBooks } },
          { $set: { status: "available" } }
        );
      }
      return acceptedTrade as TradeType;
    }
  } catch (error) {
    console.error(error);
  }
};
