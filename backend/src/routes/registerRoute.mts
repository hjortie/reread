import express from "express";
import type { registerRequest } from "../models/registerRequest.js";
import { createUser } from "../controllers/registerController.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  try {
    const { username, email, password }: registerRequest = req.body;
    if (!username || !email || !password) {
      console.log("All fields required");
      res.status(400).json({ message: "All fields required" });
    } else {
      const newUser = await createUser({ username, email, password });
      res
        .status(201)
        .json({ message: "Registered user successfully", newUser });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
