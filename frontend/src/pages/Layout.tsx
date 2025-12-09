import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <main id="app">
        <Outlet />
      </main>
    </>
  );
};
