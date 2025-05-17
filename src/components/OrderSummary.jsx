import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, quantities, selectedAddress } = location.state || {};

  // Total MRP calculation
  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.price * (quantities[item._id] || 1),
    0
  );

  // Total quantity of all items
  const totalItems = cartItems.reduce(
    (total, item) => total + (quantities[item._id] || 1),
    0
  );

  const discount = totalItems * 300;

  const deliveryCharge = 0;
  const totalAmount = totalMRP - discount;

  const handlePlaceOrder = () => {
    navigate("/order-successful");
  };

  return (
    <div>
      <Header />
      <main className="bg-light py-2">
        <div
          className="container my-5 p-4 shadow rounded"
          style={{ maxWidth: "600px" }}
        >
          <h4 className="text-center mb-4">Product Details</h4>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between align-items-center mb-3"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width="60"
                  height="80"
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "10px",
                  }}
                />
                <span>{item.title}</span>
              </div>
              <div>
                <span>Qty: {quantities[item._id] || 1}</span>
              </div>
            </div>
          ))}

          <hr />
          <h5 className="mb-3 text-center">Price Details</h5>
          <div className="px-2">
            <div className="d-flex justify-content-between">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Price:</span>
              <span>₹{totalMRP}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Discount:</span>
              <span>- ₹{discount}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Delivery Charges:</span>
              <span>{deliveryCharge === 0 ? "₹0" : `₹ ${deliveryCharge}`}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total Amount:</h5>
              <h5>₹{totalAmount}</h5>
            </div>
          </div>

          <hr />
          <h5 className="text-center mb-3">Delivery Details</h5>
          <div className="px-2">
            <p>
              <b>{selectedAddress?.name}</b>
            </p>
            <p>
              {selectedAddress?.street}, {selectedAddress?.city},{" "}
              {selectedAddress?.zip},
              <br />
              {selectedAddress?.state}, {selectedAddress?.country}
            </p>
          </div>

          <button
            className="btn btn-dark w-100 mt-4"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </main>
    </div>
  );
};

export default OrderSummary;
