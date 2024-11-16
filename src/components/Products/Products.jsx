import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../Api/Api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Fetch products
    api
      .get("/products/trending-products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load products. Please try again later.");
      });
  }, []);

  return (
    <section className="trending-product section" style={{ marginTop: "12px" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Trending Products</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {error ? (
            <div className="col-12">
              <p className="error-message">{error}</p>
            </div>
          ) : products.length > 0 ? (
            products.map(
              (
                {
                  id,
                  image,
                  name,
                  discount,
                  slug,
                  category,
                  rating,
                  reviews,
                  discount_price,
                  real_price,
                },
                index
              ) => (
                <div
                  className="col-lg-3 col-md-6 col-12"
                  key={id}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                >
                  <div className="single-product">
                    <div className="product-image">
                      <img src={image} alt={name} />
                      {discount && (
                        <span className="sale-tag">-{discount}%</span>
                      )}
                      <div className="button">
                        <Link to={`/product/${slug}`} className="btn">
                          <i className="lni lni-cart"></i> Add to Cart
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <span className="category">{category}</span>
                      <h4 className="title">
                        <Link to={`/product/${slug}`}>{name}</Link>
                      </h4>
                      <ul className="review">
                        {[...Array(5)].map((_, index) => (
                          <li key={index}>
                            <i
                              className={
                                index < rating
                                  ? "lni lni-star-filled"
                                  : "lni lni-star"
                              }
                            ></i>
                          </li>
                        ))}
                        <li>
                          <span>{reviews} Review(s)</span>
                        </li>
                      </ul>
                      <div className="price">
                        <span>${discount_price}</span>
                        {real_price && (
                          <span className="discount-price">
                            ${real_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="col-12">
              <p>Loading products...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
