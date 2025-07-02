import axios from "axios";

// Define the base URL for your Django API
const API_URL = "http://127.0.0.1:8000/api/";

// Home API: Fetch store home message
export const getStoreHome = async () => {
  try {
    const response = await axios.get(`${API_URL}store-home/`);
    return response.data; // Return store home message
  } catch (error) {
    console.error("Error fetching store home message:", error);
    throw error; // Handle error
  }
};

// Cart APIs:
// Add product to the cart
export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}cart/add/${productId}/`, {
      quantity: quantity,
    });
    return response.data; // Return response after adding to cart
  } catch (error) {
    console.error(`Error adding product ${productId} to cart:`, error);
    throw error; // Handle error
  }
};

// View current user's cart
export const viewCart = async () => {
  try {
    const response = await axios.get(`${API_URL}cart/view/`);
    return response.data; // Return current cart details
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error; // Handle error
  }
};

// Remove product from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}cart/remove/${productId}/`);
    return response.data; // Return response after removing from cart
  } catch (error) {
    console.error(`Error removing product ${productId} from cart:`, error);
    throw error; // Handle error
  }
};

// Checkout (process payment)
export const checkout = async () => {
  try {
    const response = await axios.get(`${API_URL}cart/checkout/`);
    return response.data; // Return checkout details
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error; // Handle error
  }
};

// Clear cart
export const clearCart = async () => {
  try {
    const response = await axios.post(`${API_URL}cart/clear/`);
    return response.data; // Return response after clearing cart
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error; // Handle error
  }
};

// Store APIs:
// Fetch list of all products
export const getProductList = async () => {
  try {
    const response = await axios.get(`${API_URL}products/`);
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; // Handle error
  }
};

// Fetch product details by id
export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}products/${id}/`);
    return response.data; // Return product details
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error; // Handle error
  }
};
