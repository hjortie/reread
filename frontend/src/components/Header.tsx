import { NavLink } from "react-router";
import Logo from "../assets/logo.svg?react";

export const Header = () => {
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
        </nav>
      </header>
    </>
  );
};
