import React, { useEffect, useState, useRef } from "react";
import { CheckCircle, CreditCard, Building2, Smartphone } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [bill, setBill] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const { checkout } = useCart();
  const navigate = useNavigate();

  // 🔒 Redirect if shipping info not found
  useEffect(() => {
    const savedShipping = localStorage.getItem("shipping");
    if (!savedShipping) {
      navigate("/shipping");
    }
  }, [navigate]);

  useEffect(() => {
    const savedInfo = localStorage.getItem("shipping");
    if (savedInfo) {
      setShippingInfo(JSON.parse(savedInfo));
    }

    const handleCheckout = async () => {
      try {
        const data = await checkout();
        if (data?.status === "success") {
          setBill(data.bill || []);
          setTotal(data.total_price || 0);
          localStorage.setItem("last_bill", JSON.stringify(data));
        } else {
          console.error("Checkout failed:", data?.message);
        }
      } catch (err) {
        console.error("Checkout error:", err);
      } finally {
        setLoading(false);
      }
    };

    const savedBill = localStorage.getItem("last_bill");
    if (savedBill && !hasFetched.current) {
      const parsed = JSON.parse(savedBill);
      setBill(parsed.bill || []);
      setTotal(parsed.total_price || 0);
      setLoading(false);
    } else {
      handleCheckout();
    }

    hasFetched.current = true;
  }, []);

  const handleBackToStore = async () => {
    try {
      await fetch("http://localhost:8000/api/cart/clear/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="))
            ?.split("=")[1],
        },
      });
    } catch (err) {
      console.error("Error clearing cart:", err);
    }

    localStorage.removeItem("last_bill");
    localStorage.removeItem("shipping");
    navigate("/store");
  };

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", icon: <Smartphone className="w-5 h-5" />, available: true },
    { id: "bank", name: "Bank Transfer", icon: <Building2 className="w-5 h-5" />, available: false },
    { id: "card", name: "Credit/Debit Card", icon: <CreditCard className="w-5 h-5" />, available: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center px-4 py-12 pt-24">
      <div className="bg-gray-900/80 border border-yellow-500/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center text-center mb-6">
          <CheckCircle className="text-yellow-500 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">Order Complete!</h2>
          <p className="text-gray-300 mb-4">Thank you for shopping with Fitness Freak</p>
        </div>

        {/* Shipping Info */}
        {shippingInfo && (
          <div className="mb-6 text-sm text-gray-300">
            <h4 className="text-yellow-400 font-semibold mb-1">Shipping Information</h4>
            <p><strong>Name:</strong> {shippingInfo.name}</p>
            <p><strong>Phone:</strong> {shippingInfo.phone}</p>
            <p><strong>Address:</strong> {shippingInfo.address}</p>
            <button
              onClick={() => navigate("/shipping")}
              className="text-sm text-yellow-400 underline hover:text-yellow-500 mt-2"
            >
              Edit Shipping Info
            </button>
          </div>
        )}

        {/* Order Summary */}
        {loading ? (
          <p className="text-center text-yellow-400">Loading your bill...</p>
        ) : bill.length > 0 ? (
          <div className="mb-6">
            <h4 className="text-yellow-400 font-semibold mb-2">Order Summary</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              {bill.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.product_name} x{item.quantity}</span>
                  <span>Rs. {item.total}</span>
                </li>
              ))}
              <li className="flex justify-between font-bold mt-2 border-t border-gray-700 pt-2">
                <span>Total:</span>
                <span>Rs. {total}</span>
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-center text-red-500">Bill not found or already cleared.</p>
        )}

        {/* Payment Options */}
        <div className="mb-6">
          <h4 className="text-yellow-500 text-lg font-semibold mb-4">Payment Options</h4>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                  method.available
                    ? selectedPayment === method.id
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-gray-600 hover:border-yellow-500/50"
                    : "border-gray-700 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => method.available && setSelectedPayment(method.id)}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded mr-3 ${method.available ? "text-yellow-500" : "text-gray-500"}`}>
                    {method.icon}
                  </div>
                  <div>
                    <span className="text-white font-medium">{method.name}</span>
                    {!method.available && (
                      <span className="text-xs text-gray-400 ml-2">(Coming Soon)</span>
                    )}
                  </div>
                </div>
                {method.available && (
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedPayment === method.id
                        ? "border-yellow-500 bg-yellow-500"
                        : "border-gray-500"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COD Message */}
        {selectedPayment === "cod" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 text-yellow-500 text-sm">
            ✓ Pay when you receive your order<br />
            ✓ Delivery in 3-5 business days
          </div>
        )}

        <button
          onClick={handleBackToStore}
          className="w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
