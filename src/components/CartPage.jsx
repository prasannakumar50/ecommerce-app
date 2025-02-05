import { useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartReducer";

const CartPage = () => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1)
    const cartItems = useSelector((state) => state.cart.cartItems);

    const IncreaseQuantity = (e)=>{
        setQuantity(prev => prev +1)
    }

    const DecreaseQuantity = (e)=>{
        e.stopPropagation();
        if(quantity === 1){
          return 
        }
        setQuantity(prev => prev - 1)
    }

    return (
        <div>
            <Header />
            
            <main className="bg-light py-4">
            <div className="container">
                <h2 className="text-center mb-4">My Cart</h2>

                {cartItems.length === 0 ? (
                    <p className="text-center">Your cart is empty.</p>
                ) : (
                    <div className="">
                        {cartItems.map((item, index) => (
                            <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
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
                                                <button className="btn btn-dark me-3" onClick={DecreaseQuantity}><b>-</b></button>
                                                <span className="me-3"><b>{quantity}</b></span>
                                                <button className="btn btn-dark " onClick={IncreaseQuantity}><b>+</b></button> 
                                            </div>
                                            <div className="mt-3">
                                            <button className="btn btn-dark me-3"><b>Add to wishlist</b></button>
                                            <button className="btn btn-dark text-white" onClick={() => dispatch(removeFromCart(item.id))}><b>Remove from Cart</b></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </main>
            
        </div>
    );
};

export default CartPage;
