import express from "express";
export const logoutRouter = express.Router();

logoutRouter.post("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not signed in" });
  }

  res.clearCookie("login", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res.status(200).json({ message: "Signed out" });
});
