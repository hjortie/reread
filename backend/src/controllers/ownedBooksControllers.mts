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

export const updateBook = async (
  userId: string,
  bookId: string,
  data: registerBookRequest
) => {
  //Rensa bort tomma fält
  const allowedFields = new Set([
    "title",
    "author",
    "genre",
    "condition",
    "description",
    "imageUrl",
  ]);
  const sanitizedData: Record<string, unknown> = {};

  for (const [field, value] of Object.entries(data)) {
    if (!allowedFields.has(field)) continue;
    if (value === undefined || value === null) continue;
    sanitizedData[field] = typeof value === "string" ? value.trim() : value;
  }

  if (Object.keys(sanitizedData).length === 0) return null; //alla fält har rensats: ingen meningsfull förändring

  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId, ownerId: userId },
    { $set: sanitizedData },
    { new: true, runValidators: true }
  );
  return updatedBook;
};
