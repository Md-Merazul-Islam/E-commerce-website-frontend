import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                        <select id="select4">
                          <option value="0" selected>
                            $ USD
                          </option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <div className="select-position">
                        <select id="select5">
                          <option value="0" selected>
                            English
                          </option>
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
                      <Link className="text-decoration-none" to="about-us.html">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to="contact.html">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div className="top-end">
                  <div className="user">
                    <i className="lni lni-user"></i>
                    Hello
                  </div>
                  <ul className="user-login">
                    <li>
                      <Link className="text-decoration-none" to="login.html">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to="register.html">
                        Register
                      </Link>
                    </li>
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
                  <img src="assets/images/logo/logo.svg" alt="Logo" />
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
                        <select id="select1">
                          <option selected>All</option>
                          <option value="1">option 01</option>
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
                      <span>(+100) 123 456 7890</span>
                    </h3>
                  </div>
                  <div className="navbar-cart">
                    <div className="wishlist">
                      <Link
                        className="text-decoration-none"
                        to="javascript:void(0)"
                      >
                        <i className="lni lni-heart"></i>
                        <span className="total-items">0</span>
                      </Link>
                    </div>
                    <div className="cart-items">
                      <Link
                        className="text-decoration-none main-btn"
                        to="javascript:void(0)"
                      >
                        <i className="lni lni-cart"></i>
                        <span className="total-items">2</span>
                      </Link>
                      {/* <!-- Shopping Item --> */}
                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>2 Items</span>
                          <Link className="text-decoration-none" to="cart.html">
                            View Cart
                          </Link>
                        </div>
                        <ul className="shopping-list">
                          <li>
                            <Link
                              className="text-decoration-none remove"
                              to="javascript:void(0)"
                              title="Remove this item"
                            >
                              <i className="lni lni-close"></i>
                            </Link>
                            <div className="cart-img-head">
                              <Link
                                className="cart-img text-decoration-none"
                                to="product-details.html"
                              >
                                <img
                                  src="assets/images/header/cart-items/item1.jpg"
                                  alt="#"
                                />
                              </Link>
                            </div>

                            <div className="content">
                              <h4>
                                <Link
                                  className="text-decoration-none"
                                  to="product-details.html"
                                >
                                  Apple Watch Series 6
                                </Link>
                              </h4>
                              <p className="quantity">
                                1x - <span className="amount">$99.00</span>
                              </p>
                            </div>
                          </li>
                          <li>
                            <Link
                              className="remove text-decoration-none"
                              to="javascript:void(0)"
                              title="Remove this item"
                            >
                              <i className="lni lni-close"></i>
                            </Link>
                            <div className="cart-img cart-img-head">
                              <Link
                                className="text-decoration-none"
                                to="product-details.html"
                              >
                                <img
                                  src="assets/images/header/cart-items/item2.jpg"
                                  alt="#"
                                />
                              </Link>
                            </div>
                            <div className="content">
                              <h4>
                                <Link
                                  className="text-decoration-none"
                                  to="product-details.html"
                                >
                                  Wi-Fi Smart Camera
                                </Link>
                              </h4>
                              <p className="quantity">
                                1x - <span className="amount">$35.00</span>
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="bottom">
                          <div className="total">
                            <span>Total</span>
                            <span className="total-amount">$134.00</span>
                          </div>
                          <div className="button">
                            <Link
                              className="text-decoration-none btn animate"
                              to="checkout.html"
                            >
                              Checkout
                            </Link>
                          </div>
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
                    <li className="text-dec">
                      <Link
                        to="product-grids.html"
                        className="text-decoration-none"
                      >
                        Electronics <i className="lni lni-chevron-right"></i>
                      </Link>
                      <ul className="inner-sub-category">
                        <li>
                          <Link
                            className="text-decoration-none"
                            to="product-grids.html"
                          >
                            Digital Cameras
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="text-decoration-none"
                            to="product-grids.html"
                          >
                            Camcorders
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="text-decoration-none"
                            to="product-grids.html"
                          >
                            CamerLink Drones
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link
                        className="text-decoration-none"
                        to="product-grids.html"
                      >
                        accessories
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-decoration-none"
                        to="product-grids.html"
                      >
                        Televisions
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-decoration-none"
                        to="product-grids.html"
                      >
                        best selling
                      </Link>
                    </li>
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
                          className="text-decoration-none dd-menu collapsed"
                          to="javascript:void(0)"
                          data-bs-toggle="collapse"
                          data-bs-target="#submenu-1-2"
                          aria-controls="navbarSupportedContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          Pages
                        </Link>
                        <ul className="sub-menu collapse" id="submenu-1-2">
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="about-us.html"
                            >
                              About Us
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="faq.html"
                            >
                              Faq
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="text-decoration-none dd-menu collapsed"
                          to="javascript:void(0)"
                          data-bs-toggle="collapse"
                          data-bs-target="#submenu-1-3"
                          aria-controls="navbarSupportedContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          Shop
                        </Link>
                        <ul className="sub-menu collapse" id="submenu-1-3">
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="product-grids.html"
                            >
                              Shop Grid
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="product-list.html"
                            >
                              Shop List
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="product-details.html"
                            >
                              shop Single
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="cart.html"
                            >
                              Cart
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="checkout.html"
                            >
                              Checkout
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="text-decoration-none dd-menu collapsed"
                          to="javascript:void(0)"
                          data-bs-toggle="collapse"
                          data-bs-target="#submenu-1-4"
                          aria-controls="navbarSupportedContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          Blog
                        </Link>
                        <ul className="sub-menu collapse" id="submenu-1-4">
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="blog-grid-sidebar.html"
                            >
                              Blog Grid Sidebar
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="blog-single.html"
                            >
                              Blog Single
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="text-decoration-none"
                              to="blog-single-sidebar.html"
                            >
                              Blog Single Sibebar
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="text-decoration-none"
                          to="contact.html"
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
                    <Link
                      className="text-decoration-none"
                      to="javascript:void(0)"
                    >
                      <i className="lni lni-facebook-filled"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none"
                      to="javascript:void(0)"
                    >
                      <i className="lni lni-twitter-original"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none"
                      to="javascript:void(0)"
                    >
                      <i className="lni lni-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none"
                      to="javascript:void(0)"
                    >
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
