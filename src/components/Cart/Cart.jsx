// import React, { useEffect, useState } from "react";
// import api from "../Api/Api"; // Adjust this path to your API utility
// import { Link } from "react-router-dom";
// import "./Cart.css";

// // Utility function to get the JWT token from local storage
// const getAuthToken = () => {
//   return localStorage.getItem("token");
// };

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   // Fetch cart items from API on component mount
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) {
//           console.error("No authentication token found.");
//           return;
//         }

//         const response = await api.get("cart/add-to-cart/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setCartItems(response.data);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   // Handle quantity update
//   const handleQuantityChange = async (id, quantity) => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         console.error("No authentication token found.");
//         return;
//       }

//       const updatedCartItems = cartItems.map((item) =>
//         item.id === id ? { ...item, quantity: quantity } : item
//       );
//       setCartItems(updatedCartItems);

//       // Update the cart item quantity via API with the JWT token
//       await api.put(
//         `cart/add-to-cart/${id}/`,
//         { quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach JWT token in the Authorization header
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   // Handle item deletion
//   const handleDelete = async (id) => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         console.error("No authentication token found.");
//         return;
//       }

//       await api.delete(`cart/add-to-cart/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Attach JWT token in the Authorization header
//         },
//       });
//       setCartItems(cartItems.filter((item) => item.id !== id)); // Remove the item from the state
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       <div className="cart-items">
//         {cartItems.map((item) => (
//           <div key={item.id} className="cart-item-card">
//             <img
//               src={item.product.image}
//               alt={item.product.name}
//               className="cart-item-image"
//             />
//             <div className="cart-item-details">
//               <h3>{item.product.name}</h3>
//               <p>{item.product.description}</p>
//               <div className="price">
//                 <span className="original-price">
//                   ${item.product.real_price}
//                 </span>
//                 <span className="discounted-price">
//                   ${item.product.discount_price}
//                 </span>
//               </div>
//               <div className="quantity-container">
//                 <label htmlFor="quantity">Quantity:</label>
//                 <input
//                   type="number"
//                   id="quantity"
//                   value={item.quantity}
//                   min="1"
//                   max={item.product.quantity}
//                   onChange={(e) =>
//                     handleQuantityChange(item.id, e.target.value)
//                   }
//                 />
//               </div>
//               <div className="actions">
//                 <button
//                   className="update-button"
//                   onClick={() => handleQuantityChange(item.id, item.quantity)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import "./Cart.css"

const Cart = () => {
  const handleQuantityChange = (inputId, isIncrement) => {
    const input = document.getElementById(inputId);
    if (input) {
      const currentValue = parseInt(input.value, 10);
      if (isIncrement) {
        input.value = currentValue + 1;
      } else if (currentValue > 0) {
        input.value = currentValue - 1;
      }
    }
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - 2 items</h5>
              </div>
              <div className="card-body">
                {/* Single item */}
                <div className="row">
                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div
                      className="bg-image hover-overlay hover-zoom ripple rounded"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                        className="w-100"
                        alt="Blue Jeans Jacket"
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.2)",
                          }}
                        ></div>
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p>
                      <strong>Blue denim shirt</strong>
                    </p>
                    <p>Color: blue</p>
                    <p>Size: M</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-1 mb-2"
                      title="Remove item"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mb-2"
                      title="Move to the wish list"
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                      <button
                        className="btn btn-primary px-3 me-2"
                        onClick={() => handleQuantityChange("form1", false)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>

                      <div className="form-outline">
                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          defaultValue="1"
                          type="number"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form1">
                          Quantity
                        </label>
                      </div>

                      <button
                        className="btn btn-primary px-3 ms-2"
                        onClick={() => handleQuantityChange("form1", true)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <p className="text-start text-md-center">
                      <strong>$17.99</strong>
                    </p>
                  </div>
                </div>
                <hr className="my-4" />
                {/* Additional items can be added here */}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                  alt="PayPal"
                />
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
                    <span>$53.98</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <p className="mb-0">(including VAT)</p>
                    </div>
                    <span>
                      <strong>$53.98</strong>
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
