import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../APi/Api";

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // Handle login state change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch cart data if logged in
    if (token) {
      api
        .get("cart/my-cart/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setCartData(response.data[0]); // Assume response contains the cart data
        })
        .catch((err) => setError(err.message));
    }
  }, []); // Empty array ensures this runs only once

  // Fetch categories for the dropdown
  useEffect(() => {
    api
      .get("/products/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []); // Empty array ensures this runs only once

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  // If cart data is not loaded yet, show a loading message
  if (!cartData) {
    return <div className="text-center">Loading...</div>;
  }

  // Calculate cart length and total amount
  const cartLength = cartData.items ? cartData.items.length : 0;
  const totalAmount = cartData.items
    ? cartData.items.reduce(
        (total, item) => total + item.product.discount_price * item.quantity,
        0
      )
    : 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("is_superuser");
    setIsLoggedIn(false);
    toast.success("Logged out successfully.");
  };

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      {/* <!-- Start Header AreLink --> */}
      <header className="header navbar-area">
        {/* <!-- Start Topbar --> */}
        <div className="topbar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4 col-12">
                <div className="top-left">
                  <ul className="menu-top-link">
                    <li>
                      <div className="select-position">
                        <select value={selectedValue}>
                          <option value="option1">$USE</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <div className="select-position">
                        <select value={selectedValue}>
                          <option value="option1">English</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div className="top-middle">
                  <ul className="useful-links">
                    <li>
                      <Link className="text-decoration-none" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to="/about-us">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to="/contact-us">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div className="top-end">
                  <ul className="user-login">
                    {isLoggedIn ? (
                      <>
                        {/* Profile icon and Logout button for logged-in users */}
                        <li>
                          <Link
                            className="text-decoration-none"
                            to="/profile-details"
                          >
                            <i className="lni lni-user"></i> Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="text-decoration-none"
                            onClick={handleLogout}
                            to="/"
                          >
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        {/* Sign In and Register links for non-logged-in users */}
                        <li>
                          <Link
                            className="text-decoration-none"
                            onClick={onLoginClick}
                            to=""
                          >
                            Sign In
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="text-decoration-none"
                            onClick={onRegisterClick}
                            to=""
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Topbar --> */}
        {/* <!-- Start Header Middle --> */}
        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-7">
                {/* <!-- Start Header Logo --> */}
                <Link
                  className="text-decoration-none navbar-brand"
                  to="index.html"
                >
                  <img src="assets/images/logo/logo.png" alt="Logo" />
                </Link>
                {/* <!-- End Header Logo --> */}
              </div>
              <div className="col-lg-5 col-md-7 d-xs-none">
                {/* <!-- Start Main Menu Search --> */}
                <div className="main-menu-search">
                  {/* <!-- navbar search start --> */}
                  <div className="navbar-search search-style-5">
                    <div className="search-select">
                      <div className="select-position">
                        <select value={selectedValue}>
                          <option value="option1">ALL</option>
                        </select>
                      </div>
                    </div>
                    <div className="search-input">
                      <input type="text" placeholder="Search" />
                    </div>
                    <div className="search-btn">
                      <button>
                        <i className="lni lni-search-alt"></i>
                      </button>
                    </div>
                  </div>
                  {/* <!-- navbar search Ends --> */}
                </div>
                {/* <!-- End Main Menu Search --> */}
              </div>
              <div className="col-lg-4 col-md-2 col-5">
                <div className="middle-right-area">
                  <div className="nav-hotline">
                    <i className="lni lni-phone"></i>
                    <h3>
                      Hotline:
                      <span>+8801401734625</span>
                    </h3>
                  </div>
                  <div className="navbar-cart">
                    <div className="wishlist">
                      <Link className="text-decoration-none" to="#">
                        <i className="lni lni-heart"></i>
                        <span className="total-items">0</span>
                      </Link>
                    </div>
                    <div className="cart-items">
                      <Link
                        className="text-decoration-none main-btn"
                        to="/my-cart"
                      >
                        <i className="lni lni-cart"></i>
                        <span className="total-items">{cartLength}</span>
                      </Link>
                      {/* <!-- Shopping Item --> */}
                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>{cartLength} Items</span>
                          <Link className="text-decoration-none" to="/my-cart">
                            View Cart
                          </Link>
                        </div>
                        <div className="bottom">
                          <div className="total">
                            <span>Total</span>
                            <span className="total-amount">
                              ${totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="button pt-5 d-flex justify-content-center">
                          <Link
                            className="text-decoration-none btn animate"
                            to="/my-cart"
                          >
                            <i class="fas fa-dollar-sign    "></i>
                            Checkout
                          </Link>
                        </div>
                      </div>
                      {/* <!--/ End Shopping Item --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Header Middle --> */}
        {/* <!-- Start Header Bottom --> */}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-6 col-12">
              <div className="nav-inner">
                {/* <!-- Start MegLink Category Menu --> */}
                <div className="mega-category-menu">
                  <span className="cat-button">
                    <i className="lni lni-menu"></i>All Categories
                  </span>
                  <ul className="sub-category">
                    {categories.map((category) => (
                      <li key={category.id} className="text-dec">
                        <Link
                          to="/all-products"
                          className="text-decoration-none"
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          {category.name}{" "}
                          <i className="lni lni-chevron-right"></i>
                        </Link>
                        {/* Optional: Sub-category or product links */}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <!-- End MegLink Category Menu --> */}

                {/* <!-- Start Navbar --> */}
                <nav className="navbar navbar-expand-lg">
                  <button
                    className="navbar-toggler mobile-menu-btn"
                    type="button"
                    onClick={toggleMenu}
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                  >
                    {isMenuOpen ? (
                      <span className="close-icon ">X</span>
                    ) : (
                      <>
                        <span className="toggler-icon"></span>
                        <span className="toggler-icon"></span>
                        <span className="toggler-icon"></span>
                      </>
                    )}
                  </button>
                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarSupportedContent"
                  >
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <Link
                          className="text-decoration-none active"
                          to="/"
                          aria-label="Toggle navigation"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="text-decoration-none "
                          to="/all-products"
                          aria-label="Toggle navigation"
                        >
                          All Products
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="text-decoration-none dd-menu collapsed"
                          to="/all-products"
                          data-bs-toggle="collapse"
                          data-bs-target="#submenu-1-3"
                          aria-controls="navbarSupportedContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          Shop Now
                        </Link>
                        <ul className="sub-menu collapse" id="submenu-1-3">
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="/all-products"
                            >
                              All Products
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="/trending-products"
                            >
                              Trading product
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="/my-cart"
                            >
                              Cart
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="/my-cart"
                            >
                              Checkout
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="text-decoration-none"
                          to="/discount-product"
                          aria-label="Toggle navigation"
                        >
                          Discount Offer
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="text-decoration-none"
                          to="/contact-us"
                          aria-label="Toggle navigation"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* 
                            <!-- navbar collapse --> */}
                </nav>
                {/* <!-- End Navbar --> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              {/* <!-- Start Nav Social --> */}
              <div className="nav-social">
                <h5 className="title">Follow Us:</h5>
                <ul>
                  <li>
                    <Link className="text-decoration-none" to="#">
                      <i className="lni lni-facebook-filled"></i>
                    </Link>
                  </li>
                  <li>
                    <Link className="text-decoration-none" to="#">
                      <i className="lni lni-twitter-original"></i>
                    </Link>
                  </li>
                  <li>
                    <Link className="text-decoration-none" to="#">
                      <i className="lni lni-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link className="text-decoration-none" to="#">
                      <i className="lni lni-skype"></i>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!-- End Nav Social --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Header Bottom --> */}
      </header>
      {/* <!-- End Header AreLink --> */}
    </div>
  );
};

export default Navbar;
