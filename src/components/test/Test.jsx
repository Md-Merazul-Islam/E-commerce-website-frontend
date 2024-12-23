import React, { useEffect, useState } from "react";
import api from "../Api/Api";


const Test = () => {
  const [cartData, setCartData] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    // If there's no token, show an error
    if (!token) {
      setError("You are not authenticated");
      return;
    }

    // Fetch cart data with Bearer token
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
  }, []);

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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Cart</h1>
      <div className="text-center">
        <h3>
          Cart ({cartLength} items) - ${totalAmount.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Test;
