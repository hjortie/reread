import { Types } from "mongoose";
import { Book } from "../models/Book.js";
import type { registerBookRequest } from "../models/registerBookRequest.js";

export const createBook = async (
  ownerId: string,
  bookData: registerBookRequest
) => {
  const newBook = await Book.create({
    ...bookData,
    ownerId: new Types.ObjectId(ownerId),
    status: "available",
  });
  return newBook;
};

export const deleteBook = async (userId: string, bookId: string) => {
  const deletedBook = await Book.findOneAndDelete({
    _id: bookId,
    ownerId: userId,
  });

  return deletedBook;
};
