import React from "react";
import "./HeroSection.css"; // Make sure to create the CSS file for custom styles

const HeroSection = () => {
  return (
    <section className="hero-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 custom-padding-right">
            <div
              id="heroSlider"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {/* Start Hero Slider */}
                <div
                  className="carousel-item active"
                  style={{
                    backgroundImage: "url(assets/images/hero/slider-bg1.jpg)",
                  }}
                >
                  <div className="content">
                    <h2 className="text-car">
                      <span>No restocking fee ($35 savings)</span> M75 Sport
                      Watch
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <h3>
                      <span>Only</span> $320.99
                    </h3>
                    <div className="button">
                      <a href="product-grids.html" className="btn">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
                {/* End Hero Slider */}
                {/* Start Hero Slider */}
                <div
                  className="carousel-item"
                  style={{
                    backgroundImage: "url(assets/images/hero/slider-bg2.jpg)",
                  }}
                >
                  <div className="content">
                    <h2 className="text-car">
                      <span>Big Sale Offer</span> Get the Best Deal on CCTV
                      Camera
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <h3>
                      <span> Only:</span> $590.00
                    </h3>
                    <div className="button">
                      <a href="product-grids.html" className="btn">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
                {/* End Hero Slider */}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#heroSlider"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#heroSlider"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="row">
              <div className="col-lg-12 col-md-6 col-12 md-custom-padding">
                {/* Start Small Banner */}
                <div
                  className="hero-small-banner"
                  style={{
                    backgroundImage: "url(assets/images/hero/slider-bnr.jpg)",
                  }}
                >
                  <div className="content">
                    <h2>
                      <span>New line required</span> iPhone 12 Pro Max
                    </h2>
                    <h3>$259.99</h3>
                  </div>
                </div>
                {/* End Small Banner */}
              </div>
              <div className="col-lg-12 col-md-6 col-12">
                {/* Start Small Banner */}
                <div className="hero-small-banner style2">
                  <div className="content">
                    <h2>Weekly Sale!</h2>
                    <p>
                      Saving up to 50% off all online store items this week.
                    </p>
                    <div className="button">
                      <a className="btn" href="product-grids.html">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
                {/* End Small Banner */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
