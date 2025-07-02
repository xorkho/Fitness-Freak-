import React, { useEffect, useState } from "react";
import { ShoppingCart, ShoppingBag, Star, Package } from "lucide-react";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../context/CartContext";

const API_BASE = "http://localhost:8000";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : "";
}

export default function Store() {
  const [products, setProducts] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
    isCartOpen,
    setIsCartOpen,
    addToCart,
  } = useCart();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE}/api/store/products/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken"),
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          setInfoMessage("Please log in to view the store.");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (Array.isArray(data)) {
          setProducts(data);
          setInfoMessage("");
        } else if (data.message) {
          setProducts([]);
          setInfoMessage(data.message);
        } else {
          setProducts([]);
          setInfoMessage("Unexpected response from server.");
        }
      })
      .catch(() => {
        setInfoMessage("Could not load products. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("PKR", "Rs.");
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700 animate-pulse">
      <div className="w-full h-56 bg-gray-700"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-700 rounded-lg mb-3"></div>
        <div className="h-4 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-700 rounded w-20"></div>
          <div className="h-10 bg-gray-700 rounded w-28"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-[#111827] text-white px-4 py-6 md:px-8 relative">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <ShoppingBag className="h-8 w-8 text-yellow-400 mr-3" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Info Message */}
        {infoMessage ? (
          <div className="flex flex-col justify-center items-center min-h-96 bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-2xl p-12 border border-gray-700">
            <Package className="h-16 w-16 text-gray-500 mb-4" />
            <p className="text-center text-gray-300 text-lg font-medium">
              {infoMessage}
            </p>
          </div>
        ) : (
          <>
            {/* Products Header */}
            {!isLoading && products.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Featured Products
                    </h2>
                    <p className="text-gray-400">
                      {products.length} products available
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading
                ? // Loading skeletons
                  Array.from({ length: 8 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                : products.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 hover:scale-[1.02] transition-all duration-500 border border-gray-700 hover:border-yellow-400/30"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-56 bg-white flex items-center justify-center">
                          <img
                            src={
                              product.image?.startsWith("/")
                                ? `${API_BASE}${product.image}`
                                : product.image
                            }
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Quick Add Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
                            {product.description}
                          </p>

                          {/* Rating Stars (placeholder) */}
                          <div className="flex items-center space-x-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                            <span className="text-gray-500 text-xs ml-2">
                              (4.8)
                            </span>
                          </div>
                        </div>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold text-yellow-400">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-gray-500 text-xs line-through">
                              {formatPrice(product.price * 1.2)}
                            </span>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25 transform hover:scale-105"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="hidden sm:inline">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Empty State */}
            {!isLoading && products.length === 0 && !infoMessage && (
              <div className="flex flex-col justify-center items-center min-h-96 bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-2xl p-12 border border-gray-700">
                <Package className="h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No Products Available
                </h3>
                <p className="text-gray-500 text-center">
                  Check back later for new products.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <CartSidebar />
    </div>
  );
}
