import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="footer">
      {/* <!-- Start Footer Middle --> */}
      <div class="footer-middle">
        <div class="container">
          <div class="bottom-inner">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Widget --> */}
                <div class="single-footer f-contact">
                  <h3>Get In Touch With Us</h3>
                  <p class="phone">Phone: +8801401734625</p>
                  <ul>
                    <li>
                      <span>Monday-Friday: </span> 9.00 am - 8.00 pm
                    </li>
                    <li>
                      <span>Saturday: </span> 10.00 am - 6.00 pm
                    </li>
                  </ul>
                  <p class="mail">
                    <Link className="nav-item-link" href="mdmerazul75@gmail.com">
                      mdmerazul75@gmail.com
                    </Link>
                  </p>
                </div>
                {/* <!-- End Single Widget --> */}
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Widget --> */}
                <div class="single-footer our-app">
                  <h3>Our Mobile App</h3>
                  <ul class="app-btn">
                    <li>
                      <Link className="nav-item-link" to="#">
                        <i class="lni lni-apple"></i>
                        <span class="small-title">Download on the</span>
                        <span class="big-title">App Store</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">
                        <i class="lni lni-play-store"></i>
                        <span class="small-title">Download on the</span>
                        <span class="big-title">Google Play</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* <!-- End Single Widget --> */}
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Widget --> */}
                <div class="single-footer f-link">
                  <h3>Information</h3>
                  <ul>
                    <li>
                      <Link className="nav-item-link" to="#">About Us</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">Contact Us</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">Downloads</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">Sitemap</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">FAQs Page</Link>
                    </li>
                  </ul>
                </div>
                {/* <!-- End Single Widget --> */}
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Widget --> */}
                <div class="single-footer f-link">
                  <h3>Shop Departments</h3>
                  <ul>
                    <li>
                      <Link className="nav-item-link" to="#">Computers & Accessories</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">Smartphones & Tablets</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">TV, Video & Audio</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">Cameras, Photo & Video</Link>
                    </li>
                    <li>
                      <Link className="nav-item-link" to="#">Headphones</Link>
                    </li>
                  </ul>
                </div>
                {/* <!-- End Single Widget --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Footer Middle --> */}
      {/* <!-- Start Footer Bottom --> */}
      <div class="footer-bottom">
        <div class="container">
          <div class="inner-content">
            <div class="row align-items-center">
              <div class="col-lg-4 col-12">
                <div class="payment-gateway">
                  <span>We Accept:</span>
                  <img
                    src="assets/images/footer/credit-cards-footer.png"
                    alt="#"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-12">
                <div class="copyright">
                  <p>Design by Md Merazul Islam</p>
                </div>
              </div>
              <div class="col-lg-4 col-12">
                <ul class="socila">
                  <li>
                    <span>Follow Us On:</span>
                  </li>
                  <li>
                    <Link className="nav-item-link" to="#">
                      <i class="lni lni-facebook-filled"></i>
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-item-link" to="#">
                      <i class="lni lni-twitter-original"></i>
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-item-link" to="#">
                      <i class="lni lni-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-item-link" to="#">
                      <i class="lni lni-google"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Footer Bottom --> */}
    </footer>
  );
};

export default Footer;
