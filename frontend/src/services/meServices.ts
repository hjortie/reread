import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const getMe = async () => {
  try {
    const res = await axios.get(`${API_BASE}/me`, { withCredentials: true });
    return res.data.user;
  } catch (error) {
    console.error(error);
  }
};
