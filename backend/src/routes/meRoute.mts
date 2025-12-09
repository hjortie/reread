import express from "express";
import jwt from "jsonwebtoken";

export const meRouter = express.Router();

meRouter.get("/", (req, res) => {
  const token = req.cookies?.login;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    res.json({ user: payload });
  } catch (error: any) {
    res.status(401).json({ message: "Invalid token" });
  }
});
