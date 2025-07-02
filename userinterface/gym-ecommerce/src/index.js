import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import { CartProvider } from "./context/CartContext"; // ✅ This is now correct
import "./index.css"; // ✅ Tailwind styles applied globally


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);