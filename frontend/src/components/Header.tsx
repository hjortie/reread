import { NavLink, useNavigate } from "react-router";
import Logo from "../assets/logo.svg?react";
import axios from "axios";
import { useMe } from "../hooks/useMe";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

export const Header = () => {
  const navigate = useNavigate();
  const { user, fetched, setUser, error } = useMe();
  const [loggingOut, setLoggingOut] = useState(false);

  const signOut = async () => {
    try {
      setLoggingOut(true);
      const success = await axios.post(`${API_BASE}/logout`, null, {
        withCredentials: true,
      });
      if (success) {
        alert("Du har loggat ut");
        setUser(null);
        setTimeout(() => navigate("/"), 20);
      }
    } catch (e) {
      console.error("Failed to sign out", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const isLoggedIn = !!user && !!user._id;

  return (
    <>
      <header className="container header">
        <div className="logo">
          <NavLink to={"/"}>
            <Logo width={100} height={100} />
          </NavLink>
        </div>
        <h1>ReRead</h1>
        <nav className="header__nav">
          <NavLink to={"/browse"}>Böcker</NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
          {fetched && isLoggedIn && (
            <button onClick={signOut} disabled={loggingOut}>
              Logga ut
            </button>
          )}
        </nav>
      </header>
    </>
  );
};
