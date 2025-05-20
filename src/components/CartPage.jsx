import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/wishlistReducer";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");

  // Filter cart items based on search term
  const filteredCartItems = cartItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  const IncreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const DecreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleProceedToCheckout = () => {
    navigate("/shipping-address", {
      state: {
        cartItems,
        quantities,
      },
    });
  };

  // Price Calculation Logic ======
  const totalItems = cartItems.reduce(
    (total, item) => total + (quantities[item._id] || 1),
    0
  );

  const totalMRP = cartItems.reduce(
    (total, item) => total + item.price * (quantities[item._id] || 1),
    0
  );

  const discount = totalItems * 300;
  const deliveryCharge = 0;
  const totalAmount = totalMRP - discount + deliveryCharge;

  return (
    <div>
      <Header wishlist={wishlistItems} search={search} setSearch={setSearch} />

      <main className="bg-light py-4">
        <div className="container">
          <h2 className="text-center mb-4">My Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <div className="row">
              {/* Cart Items */}
              <div className="col-md-7">
                {filteredCartItems.length === 0 ? (
                  <p className="text-center">No items match your search.</p>
                ) : (
                  filteredCartItems.map((item) => (
                    <div
                      key={item._id}
                      className="card mb-3"
                      style={{ maxWidth: "540px" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="img-fluid rounded-start"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              <b>{item.title}</b>
                            </h5>
                            <p className="card-text">
                              <b>Rs.{item.price}</b>
                            </p>
                            <div className="py-2">
                              <button
                                className="btn btn-dark me-3"
                                onClick={() => DecreaseQuantity(item._id)}
                              >
                                <b>-</b>
                              </button>
                              <span className="me-3">
                                <b>{quantities[item._id] || 1}</b>
                              </span>
                              <button
                                className="btn btn-dark"
                                onClick={() => IncreaseQuantity(item._id)}
                              >
                                <b>+</b>
                              </button>
                            </div>
                            <div className="mt-3">
                              <button
                                className="btn btn-dark me-2"
                                onClick={() => {
                                  dispatch(addToWishlist(item));
                                  dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: item._id,
                                  });
                                  toast.success("Product moved to Wishlist!");
                                }}
                              >
                                <b>Move to Wishlist</b>
                              </button>
                              <button
                                className="btn btn-dark text-white"
                                onClick={() => {
                                  dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: item._id,
                                  });
                                  toast.warning("Product removed from Cart!");
                                }}
                              >
                                <b>Remove from Cart</b>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price Details */}
              <div className="col-md-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h3 className="">Price Details</h3>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span>Total Items:</span>
                      <span>{totalItems}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Price:</span>
                      <span>
                         ₹{totalMRP}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Discount:</span>
                      <span>- ₹{discount}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Delivery Charges:</span>
                      <span>
                        {deliveryCharge === 0 ? "₹0" : `₹ ${deliveryCharge}`}
                      </span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <h5>Total Amount:</h5>
                      <h5>₹{totalAmount}</h5>
                    </div>
                    <hr />
                    <span>You will save ₹{discount} on this order</span>
                    <hr />
                    <button
                      className="btn btn-dark w-100 mt-3"
                      onClick={handleProceedToCheckout}
                    >
                      <b>Proceed to Checkout</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "8px",
        }}
        bodyStyle={{ color: "#fff" }}
      />
    </div>
  );
};

export default CartPage;
