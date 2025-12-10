import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/User";
const API_BASE = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${API_BASE}/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setFetched(true);
      }
    };
    if (fetched) return;
    getUser();
  });

  if (!fetched) return;
  if (!user) return <h1>Du är inte inloggad</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="dashboard container">
        <h1>Hej {user.username}</h1>
      </div>
    </>
  );
};
