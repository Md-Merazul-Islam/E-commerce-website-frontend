import { useState } from "react";
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

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/trending-products" element={<Products />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/recent-products" element={<RecentProducts />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
