import React from "react";
import { useCart } from "../context/CartContext"; // ✅ Import the cart context

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // ✅ Use addToCart directly

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.price}>Rs. {product.price}</p>
      <button onClick={() => addToCart(product)} style={styles.button}>
        Add to Cart
      </button>
    </div>
  );
};
