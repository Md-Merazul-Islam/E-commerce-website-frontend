import React from "react";
import "./RecentProducts.css";
import { Link } from "react-router-dom";
const RecentProducts = () => {
  return (
    <section className="product-wrapper pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-50">
              <h1 className="heading-1 font-weight-700">Recent Items</h1>
            </div>
          </div>
        </div>
        <div className="row">
          {/** List of products **/}
          {[
            {
              title: "Metro 38 Date",
              reference: "1102",
              price: "$399",
              rating: "4.5/5",
              images: ["assets/images/products/product-4.jpg"],
            },
            {
              title: "Man's Shoe",
              reference: "1102",
              price: "$399",
              rating: "4.5/5",
              images: ["assets/images/products/product-4.jpg"],
            },
            {
              title: "Lotto T Shirt",
              reference: "1102",
              price: "$399",
              rating: "4.5/5",
              images: ["assets/images/products/product-4.jpg"],
              discount: "20% off",
            },
            {
              title: "Smart Watch",
              reference: "1102",
              price: "$399",
              rating: "4.5/5",
              images: ["assets/images/products/product-4.jpg"],
            },
            {
              title: "Smart Gadget",
              reference: "1102",
              price: "$399",
              rating: "4.5/5",
              images: ["assets/images/products/product-4.jpg"],
            },
            {
              title: "Polo Cap",
              reference: "1102",
              price: "$399",
              rating: "4.5/5",
              images: ["assets/images/products/product-4.jpg"],
              outOfStock: true,
            },
          ].map((product, index) => (
            <div className="col-lg-6" key={index}>
              <div className="product-style-7 mt-30">
                <div className="product-image">
                  {product.discount && (
                    <span className="icon-text text-style-1 bg-warning">
                      {product.discount}
                    </span>
                  )}
                  {product.outOfStock && (
                    <span className="icon-text text-style-1">Out Of Stock</span>
                  )}
                  <div className="product-active">
                    {product.images.map((image, imgIndex) => (
                      <div
                        className={`product-item ${
                          imgIndex === 0 ? "active" : ""
                        }`}
                        key={imgIndex}
                      >
                        <img src={image} alt="product" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="product-content">
                  <ul className="product-meta">
                    <li>
                      <Link className="add-wishlist " to="javascript:void(0)">
                        <i className="mdi mdi-heart-outline text-5"></i>
                      </Link>
                    </li>
                    <li>
                      <span>
                        <i className="mdi mdi-star"></i> {product.rating}
                      </span>
                    </li>
                  </ul>
                  <h4 className="title">
                    <Link to="product-details-page.html">
                      {product.title}
                    </Link>
                  </h4>
                  <p>Reference {product.reference}</p>
                  <span className="price">{product.price}</span>
                  <Link to="javascript:void(0)" className="primary-btn">
                    <i className="mdi mdi-cart-outline"></i> {/* Cart icon */}
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
