import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../APi/Api";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/products/products-list/${productId}/`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please log in to add items to the cart.");
      return;
    }

    try {
      setLoading(true);
      await api.post(
        "/cart/add-to-cart/",
        { product_id: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item added to cart successfully!");
    } catch (error) {
      // toast.error("Failed to add item to cart. Please try again.");
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <section className="item-details">
        <div className="container">
          <div className="top-area">
            <div className="row align-items-center">
              {/* Product Images */}
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-images">
                  <main id="gallery">
                    <div className="main-img">
                      <img
                        src={product.image || "default.jpg"}
                        alt={product.name || "Product"}
                        id="current"
                      />
                    </div>
                    <div className="images">
                      {[...Array(4)].map((_, i) => (
                        <img
                          key={i}
                          src="https://st5.depositphotos.com/23435058/65001/v/380/depositphotos_650014444-stock-illustration-vector-icon-web-mobile.jpg"
                          className="img"
                          alt={`Preview ${i + 1}`}
                        />
                      ))}
                    </div>
                  </main>
                </div>
              </div>

              {/* Product Info */}
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-info">
                  <h2 className="title">{product.name}</h2>
                  <p className="category">
                    <i className="lni lni-tag"></i> Category:{" "}
                    <span>{product.category}</span>
                  </p>
                  <h3 className="price">
                    ${product.discount_price}
                    <span>${product.real_price}</span>
                  </h3>
                  <p>
                    <strong>Discount:</strong> {product.discount}% off
                  </p>
                  <p className="info-text">{product.description}</p>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      <p>
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <p>
                        <strong>Category:</strong> {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-content">
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-4 col-12">
                        <button
                          className="btn btn-primary"
                          style={{ width: "100%" }}
                          onClick={() => handleAddToCart(product.id)}
                          disabled={loading}
                        >
                          {loading ? "Adding..." : "Add to Cart"}
                        </button>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <button className="btn">
                          <i className="lni lni-reload"></i> Compare
                        </button>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
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
      </section>
    </div>
  );
};

export default ProductDetails;
