import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentProducts.css";
import { Link } from "react-router-dom";
import api from "../Api/Api";
import AOS from "aos";
import "aos/dist/aos.css";

const RecentProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    api
      .get("/products/recent-products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="product-wrapper pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-50">
              <h2 className="heading-1 font-weight-700 b-bt">Recent Items</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <div
              className="col-lg-6"
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 300}`}
            >
              <Link
                to={`/product-details/${product.id}`}
                className="text-decoration-none"
              >
              <div className="product-style-7 mt-30">
                <div className="product-image">
                  {product.discount && (
                    <span className="icon-text text-style-1 bg-warning">
                      {product.discount}% off
                    </span>
                  )}
                  {product.quantity <= 0 && (
                    <span className="icon-text text-style-1">Out Of Stock</span>
                  )}
                  <div className="product-active">
                    <div className="product-item active">
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="product-content">
                  <ul className="product-meta">
                    <li>
                      <Link className="add-wishlist " to="#">
                        <i className="mdi mdi-heart-outline text-5"></i>
                      </Link>
                    </li>
                    <li>
                      <span>
                        <i className="mdi mdi-star"></i> 4.5/5
                      </span>
                    </li>
                  </ul>
                  <h4 className="title">
                    <Link to={`/product-details/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h4>
                  <p>Reference {product.id}</p>
                  <span className="price">
                    {product.discount_price
                      ? `$${product.discount_price}`
                      : `$${product.real_price}`}
                  </span>
                  <Link to="#" className="primary-btn">
                    <i className="mdi mdi-cart-outline"></i> Add to Cart
                  </Link>
                </div>
              </div>

              </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
