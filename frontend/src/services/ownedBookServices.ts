import axios from "axios";
import { Book } from "../models/Book";

const API_BASE = import.meta.env.VITE_API_URL;

export const getOwnedBooks = async () => {
  const response = await axios.get(`${API_BASE}/dashboard/my-books`, {
    withCredentials: true,
  });
  return response.data.userBooks as Book[];
};
