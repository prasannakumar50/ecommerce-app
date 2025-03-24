import { useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {  } from "../redux/cartReducer";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Store quantity as an object where key is item ID
    const [quantities, setQuantities] = useState({});

    // Increase Quantity
    const IncreaseQuantity = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1,
        }));
    };

    // Decrease Quantity
    const DecreaseQuantity = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1,
        }));
    };

    return (
        <div>
            <Header />

            <main className="bg-light  py-4">
                <div className="container">
                    <h2 className="text-center mb-4">My Cart</h2>

                    {cartItems.length === 0 ? (
                        <p className="text-center">Your cart is empty.</p>
                    ) : (
                        <div className="row">
                            {/* Cart Items Section */}
                            <div className="col-md-7">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="card mb-3" style={{ maxWidth: "540px" }}>
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
                                                    <h5 className="card-title"><b>{item.title}</b></h5>
                                                    <p className="card-text"><b>Rs.{item.price}</b></p>
                                                    <div className="py-2">
                                                        <button
                                                            className="btn btn-dark me-3"
                                                            onClick={() => DecreaseQuantity(item._id)}
                                                        >
                                                            <b>-</b>
                                                        </button>
                                                        <span className="me-3"><b>{quantities[item._id] || 1}</b></span>
                                                        <button
                                                            className="btn btn-dark"
                                                            onClick={() => IncreaseQuantity(item._id)}
                                                        >
                                                            <b>+</b>
                                                        </button>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button className="btn btn-dark me-3"><b>Add to wishlist</b></button>
                                                        <button
                                                            className="btn btn-dark text-white"
                                                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item._id })}
                                                        >
                                                            <b>Remove from Cart</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Details Section */}
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>Price Details</h3>
                                        <p>Total Items: {cartItems.length}</p>
                                        <p>Discount Amount: <b></b></p>
                                        <p><b>Total Price:  
                                                 Rs. {cartItems.reduce((total, item) => 
                                                    total + item.price * (quantities[item._id] || 1), 0)}
                                            </b>
                                        </p>
                                        <button className="btn btn-dark"><b>Proceed to Checkout</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CartPage;
