import React from "react";
import {
  FaUsers,
  FaBullseye,
  FaLeaf,
  FaHandshake,
  FaStar,
} from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h1>About Us</h1>
        <p className="intro-text">
          Welcome to ShopEase, your trusted online destination for quality
          products. Founded in 2020, we’re dedicated to providing an exceptional
          shopping experience, backed by customer care and a commitment to
          sustainability.
        </p>

        {/* Mission Section */}
        <div className="mission-section">
          <h2>
            <FaBullseye /> Our Mission
          </h2>
          <p>
            At ShopEase, our mission is simple: to make quality products
            accessible to everyone, while prioritizing ethical sourcing and
            environmentally friendly practices. We aim to be a brand that our
            customers can rely on for both value and integrity.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="values-section">
          <h2>
            <FaStar /> Our Values
          </h2>
          <ul>
            <li>
              <FaHandshake /> <strong>Customer First:</strong> Every decision is
              centered around providing an exceptional customer experience.
            </li>
            <li>
              <FaUsers /> <strong>Integrity:</strong> We conduct business
              transparently and ethically.
            </li>
            <li>
              <FaLeaf /> <strong>Sustainability:</strong> We strive to minimize
              our environmental footprint with eco-friendly packaging and
              products.
            </li>
            <li>
              <FaBullseye /> <strong>Innovation:</strong> We continuously
              improve our product offerings and services to exceed expectations.
            </li>
          </ul>
        </div>

        {/* Our Story Section */}
        <div className="story-section">
          <h2>Our Story</h2>
          <p>
            ShopEase began as a small, family-owned business with a vision to
            make quality products affordable and accessible online. Over the
            years, we’ve expanded our catalog to include thousands of products,
            but our dedication to customer satisfaction has never changed.
            Today, ShopEase is a trusted name for customers worldwide.
          </p>
        </div>

    
      </div>
    </section>
  );
};

export default AboutUs;
