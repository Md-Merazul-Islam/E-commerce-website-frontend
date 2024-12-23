import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AllProducts from "./components/AllProducts/AllProducts";
import AboutUs from "./components/AboutUs/AboutUs";
import RecentProducts from "./components/RecentProducts/RecentProducts";
import Products from "./components/Products/Products";
import ContactUs from "./components/ContactUs/ContactUs";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import Profile from "./components/Profile/Profile";
import DiscountFilter from "./components/DiscountFIlter/DiscountFIlter";
import Cart from "./components/Cart/Cart";
import Test from "./components/test/Test";


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginShow = () => setShowLoginModal(true);
  const handleLoginClose = () => setShowLoginModal(false);

  const handleRegisterShow = () => setShowRegisterModal(true);
  const handleRegisterClose = () => setShowRegisterModal(false);

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    toast.success("Login successful!");
  };

  return (
    <div>
      {
        <Navbar
          onLoginClick={handleLoginShow}
          onRegisterClick={handleRegisterShow}
        />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/trending-products" element={<Products />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/recent-products" element={<RecentProducts />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/password-change" element={<PasswordReset />} />
        <Route path="/profile-details" element={<Profile />} />
        <Route path="/discount-product" element={<DiscountFilter />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/test" element={<Test />} />

      </Routes>

      {/* Login and Register Modals */}
      <LoginModal
        show={showLoginModal}
        onHide={handleLoginClose}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        show={showRegisterModal}
        onHide={handleRegisterClose}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <Footer />
      {/* <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeButton
      /> */}

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default App;
