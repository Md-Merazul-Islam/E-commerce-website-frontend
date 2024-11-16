import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Animation will only trigger once when visible
    });

    // Fetch data from the API
    fetch("http://127.0.0.1:8000/products/trending-products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty array means this effect runs once after the first render

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
          {products.map((product, index) => (
            <div
              className="col-lg-3 col-md-6 col-12"
              key={product.id}
              data-aos="fade-up" // Apply the fade-up animation
              data-aos-delay={`${index * 300}`} // Stagger the animation by index
            >
              <div className="single-product">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.discount && (
                    <span className="sale-tag">-{product.discount}%</span>
                  )}
                  <div className="button">
                    <Link to={`/product/${product.slug}`} className="btn">
                      <i className="lni lni-cart"></i> Add to Cart
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h4 className="title">
                    <Link to={`/product/${product.slug}`} className="title">
                      {product.name}
                    </Link>
                  </h4>
                  <ul className="review">
                    {[...Array(5)].map((_, index) => (
                      <li key={index}>
                        <i
                          className={
                            index < product.rating
                              ? "lni lni-star-filled"
                              : "lni lni-star"
                          }
                        ></i>
                      </li>
                    ))}
                    <li>
                      <span>{product.reviews} Review(s)</span>
                    </li>
                  </ul>
                  <div className="price">
                    <span>${product.discount_price}</span>
                    {product.real_price && (
                      <span className="discount-price">
                        ${product.real_price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
