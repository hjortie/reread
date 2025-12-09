import express from "express";
import jwt from "jsonwebtoken";
import { loginUser } from "../controllers/loginController.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });
    } else {
      const loggedInUser = await loginUser(email, password);

      if (!loggedInUser) {
        res.status(400).json({ message: "Incorrect email or password" });
      } else {
        const token = jwt.sign(loggedInUser, process.env.JWT_SECRET as string);

        res.cookie("login", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000, //Kakan expires efter en timme
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
        res
          .status(200)
          .json({ message: "Logged in successfully", loggedInUser });
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
