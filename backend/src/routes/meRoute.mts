import express from "express";

export const meRouter = express.Router();

meRouter.get("/", (req, res) => {
  if (!req.user) return res.status(200).json({ user: null });
  res.status(200).json({ user: req.user });
});
