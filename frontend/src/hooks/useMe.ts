import { useEffect, useState } from "react";
import { getMe } from "../services/meServices";
import type { User } from "../models/User";

export const useMe = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetched) return;
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch (e: any) {
        setError(e?.message ?? "Kunde inte hämta användare");
      } finally {
        setFetched(true);
      }
    })();
  }, [fetched]);

  return { user, fetched, error };
};
