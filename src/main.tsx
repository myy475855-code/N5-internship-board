import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { DetailsPage } from "./pages/DetailsPage";
import { HomePage } from "./pages/HomePage";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "internships/:id", element: <DetailsPage /> },
    ],
  },
]);

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
