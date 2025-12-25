import axios from "axios";
import { Trade } from "../models/Trade";

const API_BASE = import.meta.env.VITE_API_URL;

export const createTrade = async (bookId: string, selectedBooks: string[]) => {
  const response = await axios.post(
    `${API_BASE}/trade/${bookId}`,
    selectedBooks,
    {
      withCredentials: true,
    }
  );
  return response.data.createdTrade as Trade;
};
