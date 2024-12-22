import React, { useEffect, useState } from "react";
import api from "../Api/Api";
import "./Cart.css";

const Cart = () => {
  const [cartData, setCartData] = useState([]); // Default to an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    // If there's no token, show an error
    if (!token) {
      setError("You are not authenticated");
      return;
    }

    // Fetch cart data with Bearer token using the imported api
    api
      .get("cart/my-cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCartData(response.data); // Update state with the correct array from response
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  // If cart data is not loaded yet, show a loading message
  if (!cartData.length) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Cart</h1>
      {cartData.map((cart) => (
        <div key={cart.id} className="mb-4">
          <div className="card">
            <div className="card-header">
              {/* <h2 className="h4">Cart ID: {cart.id}</h2> */}
              <h3 className="text-muted">
                Created At: {new Date(cart.created_at).toLocaleString()}
              </h3>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    className="d-flex flex-column flex-sm-row mb-4 border p-3 rounded shadow-sm"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="img-fluid w-25 mb-3 mb-sm-0 mr-sm-3"
                    />
                    <div className="flex-grow-1">
                      <h4 className="h5">{item.product.name}</h4>
                      <p>{item.product.description}</p>
                      <p className="text-success">
                        Price: ${item.product.discount_price} (Discounted from $
                        {item.product.real_price})
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
