import React, { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    totalPrice,
    fetchCart,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) fetchCart();
  }, [isCartOpen]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center">
              <ShoppingCart className="h-6 w-6 text-yellow-400 mr-2" />
              <h2 className="text-xl font-bold text-white">Your Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-16 w-16 text-gray-600 mb-4" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="bg-gray-800 rounded-lg p-4 flex items-start gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-white">
                          {item.product_name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-yellow-400 font-medium mt-1">
                        Rs. {item.price}
                      </p>

                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product_id, item.quantity - 1)
                          }
                          className="bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md p-1"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-white">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product_id, item.quantity + 1)
                          }
                          className="bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md p-1"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span className="text-gray-300">Total:</span>
                <span className="text-yellow-400">Rs. {totalPrice}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/shipping"); // ➜ Redirect to shipping form
                }}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium hover:bg-yellow-500 transition duration-300"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {isCartOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
    </>
  );
}
