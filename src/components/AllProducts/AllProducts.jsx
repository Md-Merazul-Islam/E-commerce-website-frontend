import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AllProducts.css";
import api from "../APi/Api";
const AllProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    api
      .get("/products/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch products
    api
      .get("/products/products-list/")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === parseInt(categoryFilter)
      );
    }

    if (nameFilter) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (priceRange.min) {
      filtered = filtered.filter(
        (product) =>
          parseFloat(product.real_price) >= parseFloat(priceRange.min)
      );
    }

    if (priceRange.max) {
      filtered = filtered.filter(
        (product) =>
          parseFloat(product.real_price) <= parseFloat(priceRange.max)
      );
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, nameFilter, priceRange, products]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row test">
        {/* Filter Panel (Left Side) */}
        <div className="col-md-3 left-sider">
          <h4>Filters</h4>
          <div>
            <div className="category-buttons">
              {/* All Categories Button */}
              <button
                className={`btn m-1 ${categoryFilter === "" ? "active" : ""}`}
                style={{
                  borderColor: "#F7941D",
                  color: categoryFilter === "" ? "white" : "#F7941D",
                  backgroundColor:
                    categoryFilter === "" ? "#F7941D" : "transparent",
                }}
                onClick={() => setCategoryFilter("")}
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn m-1 ${
                    categoryFilter === category.id ? "active" : ""
                  }`}
                  style={{
                    borderColor: "#F7941D",
                    color: categoryFilter === category.id ? "white" : "#F7941D",
                    backgroundColor:
                      categoryFilter === category.id
                        ? "#F7941D"
                        : "transparent",
                  }}
                  onClick={() => {
                    setCategoryFilter(
                      category.id === categoryFilter ? "" : category.id
                    );
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Name Filter */}
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Search by name"
            />
          </div>

          {/* Price Filter */}
          <div className="form-group">
            <label>Price Range</label>
            <div className="d-flex">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
              />
              <span className="mx-2">-</span>
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
              />
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
                      {/* Removed description */}
                      <p className="card-text">
                        <h6>Price: ${product.discount_price}</h6>
                        <p className="text-muted">
                          <del>
                            {" "}
                            <b>${product.real_price}</b>
                          </del>{" "}
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

export default AllProducts;
