import express from "express";
import type { registerBookRequest } from "../models/registerBookRequest.js";
import {
  createBook,
  deleteBook,
  getUserBooks,
  updateBook,
} from "../controllers/ownedBooksControllers.mjs";

export const ownedBooksRouter = express.Router();

//Lägga till bok
ownedBooksRouter.post("/", async (req, res) => {
  try {
    //Hämta användarID från request
    const userId = req.user?._id;

    if (!userId) {
      res.status(404).json({ message: "No found user" });
    } else {
      const { title, author, genre, condition, description, imageUrl } =
        req.body as registerBookRequest;

      if (!title || !author || !genre || !condition || !description) {
        res.status(400).json({ message: "Missing required information" });
      } else {
        //Skapa bok
        const newBook = await createBook(userId, {
          title,
          author,
          genre,
          condition,
          description,
          imageUrl: imageUrl || "",
        });
        res.status(201).json({
          message: "Successfully registered new book",
          newBook,
        });
      }
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

//Ta bort bok
ownedBooksRouter.delete("/:id", async (req, res) => {
  const userId = req.user?._id;
  const bookId = req.params.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  }
  if (!bookId) {
    res.status(400).json({ message: "Missing book id" });
  }

  try {
    if (bookId && userId) {
      const deletedBook = await deleteBook(userId, bookId);

      if (!deletedBook)
        return res.status(404).json({ message: "Book not found" });

      res.status(200).json({ message: "Book deleted", deletedBook });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Redigera bokinformation
ownedBooksRouter.put("/:id", async (req, res) => {
  const userId = req.user?._id;
  const bookId = req.params.id;
  const updates = req.body as registerBookRequest;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (!bookId) return res.status(400).json({ message: "Missing book id" });
  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: "No new information provided, try again!" });
  }
  try {
    const updatedBook = await updateBook(userId, bookId, updates);

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated", book: updatedBook });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Visa alla ägda böcker
ownedBooksRouter.get("/", async (req, res) => {
  const userId = req.user?._id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userBooks = await getUserBooks(userId);
    res.status(200).json({ message: "All books loaded", userBooks });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
