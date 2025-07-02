import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shipping", JSON.stringify(form));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/80 border border-yellow-500/20 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Shipping Details
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-600 transition"
        >
          Continue to Checkout
        </button>
      </form>
    </div>
  );
};

export default ShippingDetails;
