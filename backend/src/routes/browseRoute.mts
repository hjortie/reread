import express from "express";
import { getBookById, getBooks } from "../controllers/browseControllers.mjs";

export const browseRouter = express.Router();

browseRouter.get("/", async (req, res) => {
  try {
    let { q } = req.query;
    q = q?.toString().toLowerCase();
    const userId = req.user?._id;
    const query = userId
      ? { ownerId: { $ne: userId }, status: "available" } //query exkluderar böcker som tillhör användaren
      : { status: "available" };

    const books = await getBooks(query, q);

    if (!books) {
      res.status(404).json({ message: "No available books" });
    }
    res.status(200).json({ message: "Books loaded", books });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//endpoint för singelfetch utan statusbegränsning
browseRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(book);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
