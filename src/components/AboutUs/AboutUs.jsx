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

        {/* Our Team Section */}
        {/* <div className="team-section">
          <h2>
            <FaUsers /> Meet Our Team
          </h2>
          <div className="team-members">
            <div className="team-member">
              <BsFillPersonFill className="team-icon" />
              <img src="https://via.placeholder.com/150" alt="John Doe" />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
              <p>
                John’s vision has been the driving force behind ShopEase’s
                growth. His leadership and commitment to quality set the
                standard for our brand.
              </p>
            </div>
            <div className="team-member">
              <BsFillPersonFill className="team-icon" />
              <img src="https://via.placeholder.com/150" alt="Jane Smith" />
              <h3>Jane Smith</h3>
              <p>Head of Marketing</p>
              <p>
                With a knack for digital marketing, Jane helps bring our
                products to the right audience, ensuring our mission reaches a
                global scale.
              </p>
            </div>
            <div className="team-member">
              <BsFillPersonFill className="team-icon" />
              <img src="https://via.placeholder.com/150" alt="Alice Johnson" />
              <h3>Alice Johnson</h3>
              <p>Customer Service Manager</p>
              <p>
                Alice leads our customer service team to ensure that every
                customer feels valued and supported at every step of their
                journey with us.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutUs;
