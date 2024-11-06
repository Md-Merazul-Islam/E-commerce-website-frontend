import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import Products from "../Products/Products";
import RecentProducts from "../RecentProducts/RecentProducts";
import ProductDeliveryBanner from "../Products/ProductDevliaryBanner/ProductDeliveryBanner";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Products />
      <ProductDeliveryBanner />
      <RecentProducts />
    </div>
  );
};

export default Home;
