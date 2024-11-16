import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../APi/Api";
import "./DiscountFilter.css";
const DiscountFilter = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [discountRange, setDiscountRange] = useState("");

  useEffect(() => {
    api
      .get("/products/trending-products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    // Apply discount range filter
    if (discountRange) {
      const [minDiscount, maxDiscount] = discountRange.split("-").map(Number);
      filtered = filtered.filter((product) => {
        const discount = parseInt(product.discount);
        if (maxDiscount) {
          return discount >= minDiscount && discount <= maxDiscount;
        } else if (discountRange === "50+") {
          return discount >= 50;
        }
        return discount >= minDiscount;
      });
    }

    setFilteredProducts(filtered);
  }, [discountRange, products]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="container mt-5 min-vh-100">
      <div className="row">
        {/* Filter Panel (Left Side) */}
        <div className="col-md-3">
          <h4>Filters</h4>

          {/* Discount Range Filter */}
          <div className="form-group">
            <label className="my-2">Discount Range</label>
            <div className="btn-group-vertical w-100">
              <button
                className={`btn btn-outline-primary custom-btn w-100 mb-2 ${
                  discountRange === "0-10" ? "active" : ""
                }`}
                onClick={() => setDiscountRange("0-10")}
              >
                0%-10%
              </button>
              <button
                className={`btn btn-outline-primary custom-btn w-100 mb-2 ${
                  discountRange === "10-20" ? "active" : ""
                }`}
                onClick={() => setDiscountRange("10-20")}
              >
                10%-20%
              </button>
              <button
                className={`btn btn-outline-primary custom-btn w-100 mb-2 ${
                  discountRange === "20-30" ? "active" : ""
                }`}
                onClick={() => setDiscountRange("20-30")}
              >
                20%-30%
              </button>
              <button
                className={`btn btn-outline-primary custom-btn w-100 mb-2 ${
                  discountRange === "30-40" ? "active" : ""
                }`}
                onClick={() => setDiscountRange("30-40")}
              >
                30%-40%
              </button>
              <button
                className={`btn btn-outline-primary custom-btn w-100 mb-2 ${
                  discountRange === "40-50" ? "active" : ""
                }`}
                onClick={() => setDiscountRange("40-50")}
              >
                40%-50%
              </button>
              <button
                className={`btn btn-outline-primary custom-btn w-100 mb-2 ${
                  discountRange === "50+" ? "active" : ""
                }`}
                onClick={() => setDiscountRange("50+")}
              >
                50%+
              </button>
            </div>
          </div>
        </div>

        {/* Product List (Right Side) */}
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="col-md-4 mb-4"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="card">
                    <div className="card-img-container">
                      <img
                        src={product.image}
                        className="card-img"
                        alt={product.name}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        <h6>Price: ${product.discount_price}</h6>
                        <p className="text-muted">
                          <del>
                            <b>${product.real_price}</b>
                          </del>
                          <span className="discount-class">
                            <b>( {product.discount}% off)</b>
                          </span>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <img
                  className="w-50 mx-auto"
                  src="https://i.postimg.cc/x8Zvc3Z7/no-document-or-data-found-ui-illustration-design-free-vector.jpg"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountFilter;
