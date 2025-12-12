import express from "express";
import jwt from "jsonwebtoken";
import type { UserDto } from "../models/UserDto.js";
import type { registerBookRequest } from "../models/registerBookRequest.js";

export const ownedBookRouter = express.Router();

//Lägga till bok
ownedBookRouter.put("/", async (req, res) => {
  try {
    //Kolla om inloggad användare
    const loginCookie = req.cookies["login"];
    const result = jwt.decode(loginCookie);

    if (!result) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      const user = result as UserDto;

      if (!user) {
        res.status(404).json({ message: "No found user" });
      } else {
        const { title, author, genre, condition, description, imageUrl } =
          req.body as registerBookRequest;
        if (!title || !author || !genre || !condition || !description) {
          res.status(400).json({ message: "Missing required information" });
        } else {
          const newBook = await createBook({
            title,
            author,
            genre,
            condition,
            description,
            imageUrl: imageUrl,
          });
          res.status(201).json({
            message: "Successfully registered new book",
            newBook,
          });
        }
      }
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});
