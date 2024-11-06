import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const products = [
  {
    id: 1,
    category: "Watches",
    name: "Xiaomi Mi Band 5",
    image: "assets/images/products/product-1.jpg",
    price: "$199.00",
    rating: 4,
    reviews: "4.0",
  },
  {
    id: 2,
    category: "Speaker",
    name: "Big Power Sound Speaker",
    image: "assets/images/products/product-2.jpg",
    price: "$275.00",
    discountPrice: "$300.00",
    saleTag: "-25%",
    rating: 5,
    reviews: "5.0",
  },
  {
    id: 3,
    category: "Camera",
    name: "WiFi Security Camera",
    image: "assets/images/products/product-3.jpg",
    price: "$399.00",
    rating: 5,
    reviews: "5.0",
  },
  {
    id: 4,
    category: "Phones",
    name: "iPhone 6x Plus",
    image: "assets/images/products/product-4.jpg",
    price: "$400.00",
    newTag: "New",
    rating: 5,
    reviews: "5.0",
  },
  {
    id: 4,
    category: "Phones",
    name: "iPhone 6x Plus",
    image: "assets/images/products/product-4.jpg",
    price: "$400.00",
    newTag: "New",
    rating: 5,
    reviews: "5.0",
  },
  {
    id: 4,
    category: "Phones",
    name: "iPhone 6x Plus",
    image: "assets/images/products/product-4.jpg",
    price: "$400.00",
    newTag: "New",
    rating: 5,
    reviews: "5.0",
  },
  {
    id: 4,
    category: "Phones",
    name: "iPhone 6x Plus",
    image: "assets/images/products/product-4.jpg",
    price: "$400.00",
    newTag: "New",
    rating: 5,
    reviews: "5.0",
  },
  // ...add other products similarly
];

const Products = () => {
  return (
    <section className="trending-product section" style={{ marginTop: "12px" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Trending Product</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div className="col-lg-3 col-md-6 col-12" key={product.id}>
              <div className="single-product">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.saleTag && (
                    <span className="sale-tag">{product.saleTag}</span>
                  )}
                  {product.newTag && (
                    <span className="new-tag">{product.newTag}</span>
                  )}
                  <div className="button">
                    <a href="product-details.html" className="btn">
                      <i className="lni lni-cart"></i> Add to Cart
                    </a>
                  </div>
                </div>
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h4 className="title">
                    <Link href="product-grids.html" className="title">{product.name}</Link>
                  </h4>
                  <ul className="review">
                    {[...Array(5)].map((_, index) => (
                      <li key={index}>
                        <i
                          className={
                            index < product.rating
                              ? "lni lni-star-filled"
                              : "lni lni-star"
                          }
                        ></i>
                      </li>
                    ))}
                    <li>
                      <span>{product.reviews} Review(s)</span>
                    </li>
                  </ul>
                  <div className="price">
                    <span>{product.price}</span>
                    {product.discountPrice && (
                      <span className="discount-price">
                        {product.discountPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
