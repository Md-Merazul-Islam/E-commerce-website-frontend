import React, { useEffect } from "react";
import "./ProductDeliveryBanner.css";
import { Link } from "react-router-dom";
import AOS from "aos"; 
import "aos/dist/aos.css"; 

const ProductDeliveryBanner = () => {
  const cards = [
    {
      icon: "mdi-truck-fast",
      title: "Two-hour delivery",
      description: "Available in most metros on selected in-stock products",
      linkText: "learn more",
      link: "#",
      aosAnimation: "fade-up", 
    },
    {
      icon: "mdi-message-text",
      title: "Get help buying",
      description:
        "Have Link question? Call Link Specialist or chat online for help",
      linkText: "Contact us",
      link: "contact-page.html",
      aosAnimation: "zoom-in", 
    },
    {
      icon: "mdi-ticket-percent",
      title: "Find the card for you",
      description: "Get 3% Daily Cash with special financing offers from us",
      linkText: "learn more",
      link: "#",
      aosAnimation: "flip-left", 
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  return (
    <section className="content-card-style-4 pt-70 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          {cards.map((card, index) => (
            <div
              className="col-lg-4 col-md-7 col-sm-8"
              key={index}
              data-aos={card.aosAnimation} 
            >
              <div className="single-content mt-15 text-center">
                <div className="content-icon">
                  <i className={`mdi ${card.icon}`}></i>
                </div>
                <div className="content-content">
                  <h4 className="title">
                    <Link to={card.link}>{card.title}</Link>
                  </h4>
                  <p>{card.description}</p>
                  <Link to={card.link} className="more">
                    {card.linkText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDeliveryBanner;
