import express from "express";
import { createTrade } from "../controllers/tradeControllers.mjs";

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
  } catch (error: any) {}
});

tradeRouter.put("/:id", async (req, res) => {
  //uppdatera trade med mottagarens svar : accept, eller decline
});
