import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthUser } from "./requireAuth.mjs";

export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.login;
  if (!token) return next();
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthUser;
    req.user = payload;
  } catch (error: any) {
    console.error(error.message);
  }
  next();
}
