import axios from "axios";
import { Book } from "../models/Book";
const API_BASE = import.meta.env.VITE_API_URL;

export const getAllBooks = async () => {
  const response = await axios.get(`${API_BASE}/books`);
  return response.data.books as Book[];
};
