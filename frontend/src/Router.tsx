import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { Book } from "./pages/Book";
import { Browse } from "./pages/Browse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      {
        path: "/register",
        element: <Registration />,
      },
      { path: "/login", element: <Login /> },
      { path: "/browse", element: <Browse /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/book/:id", element: <Book /> },
    ],
  },
]);
