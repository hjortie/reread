import express from "express";
import {
  createTrade,
  getTrades,
  respondToRequest,
} from "../controllers/tradeControllers.mjs";

export const tradeRouter = express.Router();

tradeRouter.post("/:id", async (req, res) => {
  //skapa en trade mot en boks ID
  const userId = req.user?._id;
  const bookId = req.params.id;
  const offeredBooks = req.body as string[];

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (!bookId) {
    res.status(400).json({ message: "Missing book id" });
  }
  if (offeredBooks.length === 0) {
    res.status(400).json({
      message: "Trade request must contain at least one offered book",
    });
  }
  try {
    const createdTrade = await createTrade(userId, bookId, offeredBooks);
    if (createdTrade) {
      res.status(201).json({ message: "Trade created", createdTrade });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

tradeRouter.get("/", async (req, res) => {
  //hämta anändarens mottagna trade requests
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userTrades = await getTrades(userId);
    if (!userTrades || userTrades.length === 0) {
      res.status(400).json({ message: "No current trades" });
    } else {
      res.status(200).json({ message: "User trades:", userTrades });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

tradeRouter.put("/:id", async (req, res) => {
  //uppdatera trade med mottagarens svar : accept, eller decline
  const userId = req.user?._id;
  const tradeId = req.params.id;
  const { action, acceptedBookId } = req.body as {
    action: "accept" | "decline";
    acceptedBookId?: string;
  };

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const updatedTradeRequest = await respondToRequest(
      tradeId,
      action,
      acceptedBookId
    );
    res
      .status(200)
      .json({ message: "Trade updated", trade: updatedTradeRequest });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
