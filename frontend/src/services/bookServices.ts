import axios from "axios";
import { Book } from "../models/Book";

const API_BASE = import.meta.env.VITE_API_URL;

export const getBooks = async () => {
  const response = await axios.get(`${API_BASE}/books`);
  return response.data.books as Book[];
};

export const updateOwnedBook = async (bookId: string, data: Partial<Book>) => {
  const response = await axios.put(
    `${API_BASE}/dashboard/my-books/${bookId}`,
    data,
    { withCredentials: true }
  );
  return response.data.book;
};

export const createOwnedBook = async (
  data: Omit<Book, "_id" | "ownerId" | "status"> & { imageUrl?: string }
): Promise<Book> => {
  const response = await axios.post(`${API_BASE}/dashboard/my-books`, data, {
    withCredentials: true,
  });
  return response.data.newBook as Book;
};

export const deleteOwnedBook = async (bookId: string) => {
  const response = await axios.delete(
    `${API_BASE}/dashboard/my-books/${bookId}`,
    { withCredentials: true }
  );
  return response.data.deletedBook as Book;
};
