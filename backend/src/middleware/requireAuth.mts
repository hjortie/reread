import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export type AuthUser = {
  _id: string;
  username: string;
  email: string;
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.login;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthUser;
    (req as any).user = payload;
    next();
  } catch (error: any) {
    console.error(error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
