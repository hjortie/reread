import express from "express";
import type { registerBookRequest } from "../models/registerBookRequest.js";
import { createBook } from "../controllers/ownedBooksControllers.mjs";

export const ownedBooksRouter = express.Router();

//Lägga till bok
ownedBooksRouter.post("/", async (req, res) => {
  try {
    //Hämta användarID från request
    const userId = (req as any).user._id;

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
