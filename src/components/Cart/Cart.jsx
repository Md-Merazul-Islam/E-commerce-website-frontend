import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken"); // Retrieve token for authentication
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/cart/my-cart/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Your Cart</h2>
      <div className="row">
        {cartItems.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card">
              <img
                src={item.product.image}
                className="card-img-top"
                alt={item.product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.product.name}</h5>
                <p className="card-text">{item.product.description}</p>
                <p className="card-text">
                  Price: <strong>${item.product.discount_price}</strong>
                </p>
                <p className="card-text">
                  Quantity: <strong>{item.quantity}</strong>
                </p>
                <p className="card-text">
                  Subtotal:{" "}
                  <strong>
                    $
                    {parseFloat(
                      item.product.discount_price * item.quantity
                    ).toFixed(2)}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
