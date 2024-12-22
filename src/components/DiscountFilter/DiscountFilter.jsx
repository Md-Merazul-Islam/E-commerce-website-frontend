import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../APi/Api";
import "./DiscountFilter.css";
import { useLocation, useNavigate } from "react-router-dom";

const DiscountFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [discountRange, setDiscountRange] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/products/trending-products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [location.search]);

  useEffect(() => {
    let filtered = products;

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

  const handleCategorySelect = (category) => {
    setDiscountRange(category);
    navigate(`/discount-product?category=${category}`);
  };

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
              {["0-10", "10-20", "20-30", "30-40", "40-50", "50+"].map((range) => (
                <button
                  key={range}
                  className={`btn btn-outline-primary custom-btn w-100 mb-2 ${
                    discountRange === range ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect(range)}
                >
                  {range === "50+" ? "50%+" : `${range}%`}
                </button>
              ))}
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
                            <b> ({product.discount}% off)</b>
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
                  alt="No data found"
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
