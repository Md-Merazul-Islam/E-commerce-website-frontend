import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSearchParams } from "react-router-dom";
import "./AllProducts.css";
import api from "../APi/Api";

const AllProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // URL Search Params Hook
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch Filters from URL
  const categoryFilter = searchParams.get("category") || "";
  const nameFilter = searchParams.get("name") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  useEffect(() => {
    // Fetch Categories
    api
      .get("/products/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch Products
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
    // Apply Filters
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

    if (minPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.real_price) >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.real_price) <= parseFloat(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, nameFilter, minPrice, maxPrice, products]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Filter Panel (Left Side) */}
        <div className="col-md-3 left-sider">
          {/* Name Filter */}
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              value={nameFilter}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              placeholder="Search by name"
            />
          </div>

          {/* Category Filter */}
          <h4>Filters</h4>
          <div className="category-buttons">
            <button
              className={`btn m-1 ${!categoryFilter ? "active" : ""}`}
              style={{
                borderColor: "#F7941D",
                color: !categoryFilter ? "white" : "#F7941D",
                backgroundColor: !categoryFilter ? "#F7941D" : "transparent",
              }}
              onClick={() => handleFilterChange("category", "")}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`btn m-1 ${
                  categoryFilter === String(category.id) ? "active" : ""
                }`}
                style={{
                  borderColor: "#F7941D",
                  color:
                    categoryFilter === String(category.id)
                      ? "white"
                      : "#F7941D",
                  backgroundColor:
                    categoryFilter === String(category.id)
                      ? "#F7941D"
                      : "transparent",
                }}
                onClick={() =>
                  handleFilterChange(
                    "category",
                    categoryFilter === String(category.id) ? "" : category.id
                  )
                }
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="form-group">
            <label>Price Range</label>
            <div className="d-flex">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <span className="mx-2">-</span>
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
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
                      <h6>Price: ${product.discount_price}</h6>
                      <p className="text-muted">
                        <del>${product.real_price}</del>{" "}
                        <span className="discount-class">
                          ({product.discount}% off)
                        </span>
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
                  alt="No data"
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
