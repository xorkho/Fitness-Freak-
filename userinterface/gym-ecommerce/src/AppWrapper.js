import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Schedule from "./pages/schedule";
import About from "./pages/About";
import Store from "./pages/store";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer"; 
import Checkout from "./pages/checkout";
import ShippingDetails from "./pages/shippingdetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Required toastify CSS

const AppWrapper = () => {
    const location = useLocation();
    const hideNavbarOnPaths = [];
    const shouldHideNavbar = hideNavbarOnPaths.includes(location.pathname);

    return (
        <CartProvider>
            {!shouldHideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/about" element={<About />} />
                <Route path="/store" element={<Store />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/shipping" element={<ShippingDetails />} />
                <Route path="/reset-password/:id" element={<ResetPassword />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" // Matches your black/yellow design
            />

            <Footer />
        </CartProvider>
    );
};

export default AppWrapper;
