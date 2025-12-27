import axios from "axios";
import { PopTrade, Trade } from "../models/Trade";

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

export const getTrades = async (): Promise<{
  incoming: PopTrade[];
  outgoing: PopTrade[];
}> => {
  const response = await axios.get(`${API_BASE}/trade`, {
    withCredentials: true,
  });
  return response.data.userTrades;
};

export const respondToTrade = async (
  tradeId: string,
  action: "accept" | "decline",
  selectedBook?: string
) => {
  const response = await axios.put(
    `${API_BASE}/trade/${tradeId}`,
    {
      action: action,
      acceptedBookId: selectedBook,
    },
    {
      withCredentials: true,
    }
  );

  return response.data.trade as Trade;
};
