import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const OrderSuccessfull = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <main className="bg-light py-4 ">
       
       <div className="container text-center mt-5 p-4 shadow rounded mb-5" style={{ maxWidth: "500px" }}>
        <h2 className="text-success mb-4 d-flex align-items-center justify-content-center gap-2">
          <span>🛍️ </span>
          <span>Order Placed Successfully!</span>
        </h2>
        <p className="mb-4">Thank you for your purchase. Your items will be delivered soon.</p>
        <button className="btn btn-dark" onClick={handleGoHome}>
          Continue Shopping
        </button>
       </div>
       
      </main>
    </div>
  );
};

export default OrderSuccessfull;
