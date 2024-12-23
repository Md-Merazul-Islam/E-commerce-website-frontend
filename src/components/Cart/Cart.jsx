import React, { useEffect, useState } from "react";
import api from "../Api/Api"; // Adjust this path to your API utility
import { Link } from "react-router-dom";
import "./Cart.css";

// Utility function to get the JWT token from local storage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const today = new Date();
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
  };

  // Fetch cart items from API on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await api.get("cart/add-to-cart/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.discount_price * item.quantity;
  }, 0);

  // Handle quantity update
  const handleQuantityChange = async (id, quantity) => {
    const input = document.getElementById(id);
    if (input) {
      const currentValue = parseInt(input.value, 10);
      if (isIncrement) {
        input.value = currentValue + 1;
      } else if (currentValue > 0) {
        input.value = currentValue - 1;
      }
    }
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const updatedCartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
      setCartItems(updatedCartItems);

      // Update the cart item quantity via API with the JWT token
      await api.put(
        `cart/add-to-cart/${id}/`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token in the Authorization header
          },
        }
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      await api.delete(`cart/add-to-cart/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach JWT token in the Authorization header
        },
      });
      setCartItems(cartItems.filter((item) => item.id !== id)); // Remove the item from the state
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart items</h5>
              </div>
              <div className="card-body">
                {/* Map through cart items */}
                {cartItems.map((item) => (
                  <div className="row" key={item.id}>
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src={item.product.image}
                          className="w-75"
                          alt={item.product.name}
                        />
                        <Link to="#">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <div className="p-3 ">
                        {/* Product Name */}
                        <h5 className="text-primary mb-2">
                          {item.product.name}
                        </h5>

                        {/* Product Price Section */}
                        <div className="mb-3">
                          <h6 className="text-success mb-1">
                            ${item.product.discount_price}
                            <small className="text-muted">
                              {" "}
                              ({item.product.discount}% off)
                            </small>
                          </h6>
                          <span className="text-muted">
                            <del>${item.product.real_price}</del>
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                            title="Remove item"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                            <span>Remove</span>
                          </button>

                          <button
                            type="button"
                            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                            title="Move to wishlist"
                          >
                            <i className="fas fa-heart"></i>
                            <span>Wishlist</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div
                        className="d-flex flex-row flex-md-row align-items-center justify-content-around gap-3 mb-4"
                        style={{
                          maxWidth: "300px",
                          margin: "0 auto", // Center container horizontally within its parent
                        }}
                      >
                        {/* Decrease Button */}
                        <button
                          className="btn-my btn-orange me-md-2 mb-2 mb-md-0"
                          style={{ width: "100%", maxWidth: "48px" }}
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              Math.max(item.quantity - 1, 1)
                            )
                          }
                        >
                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </button>

                        {/* Quantity Input */}
                        <div className="form-outline w-100">
                          <input
                            id={`quantity-${item.id}`}
                            min="1"
                            max={item.product.quantity}
                            name="quantity"
                            value={item.quantity}
                            type="number"
                            className="form-control text-center"
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                          />
                          <label
                            className="form-label text-center d-flex align-center justify-content-center"
                            htmlFor={`quantity-${item.id}`}
                          >
                            quantity
                          </label>
                        </div>

                        {/* Increase Button */}
                        <button
                          className="btn-my btn-orange ms-md-2 mt-2 mt-md-0"
                          style={{ width: "100%", maxWidth: "48px" }}
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              Math.min(item.quantity + 1, item.product.quantity)
                            )
                          }
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>

                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <h5 className="text-danger">
                  You will receive your order between {formatDate(today)} -{" "}
                  {formatDate(sevenDaysFromNow)}
                </h5>
              </div>
            </div>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <div className="d-flex justify-content-start">
                  <img
                    src="assets/images/footer/credit-cards-footer.png"
                    alt="#"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>${totalPrice.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Home Delivery</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <p className="mb-0">(including VAT)</p>
                    </div>
                    <span>
                      <strong>$${totalPrice.toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
