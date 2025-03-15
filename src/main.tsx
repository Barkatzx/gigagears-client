import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import Router from "./utils/Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={Router} />
    </CartProvider>
  </StrictMode>
);
