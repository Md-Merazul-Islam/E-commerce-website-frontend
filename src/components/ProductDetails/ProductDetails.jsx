import React, { useState } from "react";

const ProductDetails = () => {
  const [selectedValue, setSelectedValue] = useState("option1"); // Initialize selectedValue

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // Update selectedValue on select change
  };
  return (
    <div>
      <section className="item-details section">
        <div className="container">
          <div className="top-area">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-images">
                  <main id="gallery">
                    <div className="main-img">
                      <img
                        src="assets/images/product-details/01.jpg"
                        id="current"
                        alt="#"
                      />
                    </div>
                    <div className="images">
                      <img
                        src="assets/images/product-details/01.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/02.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/03.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/04.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/05.jpg"
                        className="img"
                        alt="#"
                      />
                    </div>
                  </main>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-info">
                  <h2 className="title">GoPro Karma Camera Drone</h2>
                  <p className="category">
                    <i className="lni lni-tag"></i> Drones:{" "}
                    <a href="javascript:void(0)">Action cameras</a>
                  </p>
                  <h3 className="price">
                    $850<span>$945</span>
                  </h3>
                  <p className="info-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group color-option">
                        <label className="title-label" htmlFor="size">
                          Choose color
                        </label>
                        {[...Array(4)].map((_, i) => (
                          <div
                            className={`single-checkbox checkbox-style-${
                              i + 1
                            }`}
                            key={i}
                          >
                            <input type="checkbox" id={`checkbox-${i + 1}`} />
                            <label htmlFor={`checkbox-${i + 1}`}>
                              <span></span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group">
                        <label htmlFor="color">Battery capacity</label>
                        <select value={selectedValue}>
                          <option value="option1">option 1</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="form-group quantity">
                        <label htmlFor="color">Quantity</label>
                        <select className="form-control">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-content">
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="button cart-button">
                          <button className="btn" style={{ width: "100%" }}>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="wish-button">
                          <button className="btn">
                            <i className="lni lni-reload"></i> Compare
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="wish-button">
                          <button className="btn">
                            <i className="lni lni-heart"></i> To Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-details-info">
            <div className="single-block">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="info-body custom-responsive-margin">
                    <h4>Details</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <h4>Features</h4>
                    <ul className="features">
                      <li>Capture 4K30 Video and 12MP Photos</li>
                      <li>Game-Style Controller with Touchscreen</li>
                      <li>View Live Camera Feed</li>
                      <li>Full Control of HERO6 Black</li>
                      <li>Use App for Dedicated Camera Operation</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="info-body">
                    <h4>Specifications</h4>
                    <ul className="normal-list">
                      <li>
                        <span>Weight:</span> 35.5oz (1006g)
                      </li>
                      <li>
                        <span>Maximum Speed:</span> 35 mph (15 m/s)
                      </li>
                      <li>
                        <span>Maximum Distance:</span> Up to 9,840ft (3,000m)
                      </li>
                      <li>
                        <span>Operating Frequency:</span> 2.4GHz
                      </li>
                      <li>
                        <span>Manufacturer:</span> GoPro, USA
                      </li>
                    </ul>
                    <h4>Shipping Options:</h4>
                    <ul className="normal-list">
                      <li>
                        <span>Courier:</span> 2 - 4 days, $22.50
                      </li>
                      <li>
                        <span>Local Shipping:</span> up to one week, $10.00
                      </li>
                      <li>
                        <span>UPS Ground Shipping:</span> 4 - 6 days, $18.00
                      </li>
                      <li>
                        <span>Unishop Global Export:</span> 3 - 4 days, $25.00
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
