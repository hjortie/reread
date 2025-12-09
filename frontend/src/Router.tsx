import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/register",
        element: <Registration />,
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);
