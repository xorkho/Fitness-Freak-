import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();
const API_BASE = "http://localhost:8000/api/cart";

function getCookie(name) {
  const match = document.cookie.match(
    new RegExp("(^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : "";
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": getCookie("csrftoken"),
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setCartItems(data.cart);
        setTotalPrice(data.total_price);
      }
    } catch (err) {
      toast.error("Failed to fetch cart");
      console.error("Fetch cart error:", err);
    }
  };
const addToCart = async (product) => {
  try {
    const res = await fetch(`${API_BASE}/add/${product.id}/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken"),
      },
      body: JSON.stringify({ quantity: 1 }),
    });

    // Parse manually to avoid crash on non-JSON errors
    let data;
    try {
      const text = await res.text();
      data = JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON:", e);
      data = { status: "error", message: "Invalid server response." };
    }

    // ✅ Log status and data
    console.log("Add to Cart Response:", res.status, data);

    // ✅ Always toast based on status/message
    if (res.ok && data.status === "success") {
      toast.success(data.message || "Added to cart");
      await fetchCart();
      // setIsCartOpen(true);
    } else {
      toast.error(data.message || "Failed to add to cart");
    }
  } catch (err) {
    toast.error("Add to cart failed");
    console.error("Add to cart error:", err);
  }
};

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_BASE}/remove/${productId}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": getCookie("csrftoken"),
        },
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success(data.message || "Removed from cart");
      } else {
        toast.error(data.message || "Failed to remove");
      }

      await fetchCart();
    } catch (err) {
      toast.error("Remove failed");
      console.error("Remove error:", err);
    }
  };

  const updateQuantity = async (productId, qty) => {
    if (qty < 1) {
      await removeFromCart(productId);
      return;
    }
    try {
      await fetch(`${API_BASE}/add/${productId}/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": getCookie("csrftoken"),
        },
        body: JSON.stringify({ quantity: 1 }),
      });
      await fetchCart();
    } catch (err) {
      toast.error("Quantity update failed");
      console.error("Quantity update error:", err);
    }
  };

  const checkout = async ({ showToast = true } = {}) => {
  try {
    const res = await fetch(`${API_BASE}/checkout/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken"),
      },
    });

    const data = await res.json();
    if (data.status === "success") {
      setCartItems([]);
      setTotalPrice(0);
      setIsCartOpen(false);
      if (showToast) toast.success("Order placed successfully");
      return data;
    } else {
      if (showToast) toast.error(data.message || "Checkout failed");
    }
  } catch (err) {
    if (showToast) toast.error("Checkout failed");
    console.error("Checkout error:", err);
  }
  return null;
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        setTotalPrice,
        isCartOpen,
        setIsCartOpen,
        fetchCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
