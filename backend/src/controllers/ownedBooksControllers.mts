import { Types } from "mongoose";
import { Book, type BookType } from "../models/Book.js";
import type { registerBookRequest } from "../models/registerBookRequest.js";
import { User } from "../models/User.js";

export const createBook = async (
  userId: string,
  bookData: registerBookRequest
) => {
  const newBook = await Book.create({
    ...bookData,
    ownerId: new Types.ObjectId(userId),
    status: "available",
  });
  if (newBook) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { booksOwned: newBook._id },
    });
  }

  return newBook;
};

export const deleteBook = async (userId: string, bookId: string) => {
  const deletedBook = await Book.findOneAndDelete({
    _id: bookId,
    ownerId: userId,
  });
  if (deletedBook) {
    await User.findByIdAndUpdate(userId, {
      $pull: { booksOwned: deletedBook._id },
    });
  }

  return deletedBook;
};

export const updateBook = async (
  userId: string,
  bookId: string,
  data: Partial<registerBookRequest>
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

export const getUserBooks = async (userId: string): Promise<BookType[]> => {
  const userBooks = await Book.find({ ownerId: userId });
  return userBooks;
};
