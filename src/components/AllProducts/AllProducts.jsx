import React, { useState } from "react";
import "./AllProducts.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AllProducts = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      img: "assets/images/products/product-1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      img: "assets/images/products/product-1.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 30,
      img: "assets/images/products/product-1.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      price: 40,
      img: "assets/images/products/product-1.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      price: 50,
      img: "assets/images/products/product-1.jpg",
    },
  ];

  // State for price range
  const [priceRange, setPriceRange] = useState([0, 50]);

  // Filter products by price range
  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Handle price slider change
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  return (
    <section className="product-area shop-sidebar shop section">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4 col-12">
            <div className="shop-sidebar">
              {/* Categories Widget */}
              <div className="single-widget category">
                <h3 className="title">Categories</h3>
                <ul className="categor-list">
                  {[
                    "T-shirts",
                    "Jacket",
                    "Jeans",
                    "Sweatshirts",
                    "Trousers",
                    "Kitwears",
                    "Accessories",
                  ].map((category) => (
                    <li key={category}>
                      <a to="#" onClick={(e) => e.preventDefault()}>
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shop by Price Widget */}
              <div className="single-widget range">
                <h3 className="title">Shop by Price</h3>
                <div className="price-filter">
                  <div className="price-filter-inner">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={50}
                      step={1}
                      onChange={handleSliderChange}
                    />
                    <div className="price_slider_amount">
                      <div className="label-input">
                        <span>Range:</span>
                        <input
                          type="text"
                          value={`$${priceRange[0]} - $${priceRange[1]}`}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Posts Widget */}
              <div className="single-widget recent-post">
                <h3 className="title">Recent post</h3>
                {[
                  {
                    name: "Girls Dress",
                    price: "$99.50",
                    rating: 3,
                    img: "https://via.placeholder.com/75x75",
                  },
                  {
                    name: "Women Clothings",
                    price: "$99.50",
                    rating: 4,
                    img: "https://via.placeholder.com/75x75",
                  },
                  {
                    name: "Man Tshirt",
                    price: "$99.50",
                    rating: 5,
                    img: "https://via.placeholder.com/75x75",
                  },
                ].map((post, index) => (
                  <div className="single-post first" key={index}>
                    <div className="image">
                      <img src={post.img} alt={post.name} />
                    </div>
                    <div className="content">
                      <h5>
                        <a to="#" onClick={(e) => e.preventDefault()}>
                          {post.name}
                        </a>
                      </h5>
                      <p className="price">{post.price}</p>
                      <ul className="reviews">
                        {[...Array(5)].map((_, i) => (
                          <li
                            key={i}
                            className={i < post.rating ? "yellow" : ""}
                          >
                            <i className="fas fa-star"></i>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Manufacturers Widget */}
              <div className="single-widget category">
                <h3 className="title">Manufacturers</h3>
                <ul className="categor-list">
                  {[
                    "Forever",
                    "Giordano",
                    "Abercrombie",
                    "Ecko United",
                    "Zara",
                  ].map((manufacturer) => (
                    <li key={manufacturer}>
                      <a to="#" onClick={(e) => e.preventDefault()}>
                        {manufacturer}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-lg-9 col-md-8 col-12">
            <div className="row">
              <div className="col-12">
                <div className="shop-top">
                  <ul className="view-mode">
                    <li className="active">
                      <a to="shop-grid.html">
                        <i className="fas fa-border-all"></i>
                      </a>
                    </li>
                    <li>
                      <a to="shop-list.html">
                        <i className="fas fa-list"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                    <div className="single-product product-info">
                      <div className="product-img">
                        <a to="product-details.html">
                          <img
                            className="default-img"
                            src={product.img}
                            alt={product.name}
                          />
                          <img
                            className="hover-img"
                            src={product.img}
                            alt={product.name}
                          />
                        </a>
                        <div className="button-head">
                          <div className="product-action">
                            <a
                              title="Quick View"
                              to="#"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-eye"></i>
                              <span>Quick Shop</span>
                            </a>
                            <a
                              title="Wishlist"
                              to="#"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="far fa-heart"></i>
                              <span>Add to Wishlist</span>
                            </a>
                            <a
                              title="Compare"
                              to="#"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-chart-bar"></i>
                              <span>Add to Compare</span>
                            </a>
                          </div>
                          <div className="product-action-2">
                            <a
                              title="Add to cart"
                              to="#"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-cart-shopping"></i>
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-content">
                        <h3>
                          <a to="product-details.html">{product.name}</a>
                        </h3>
                        <div className="product-price">
                          <span>${product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found in this price range.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
