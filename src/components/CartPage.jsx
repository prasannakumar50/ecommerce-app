import Header from "./Header";
import { useSelector } from "react-redux";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);

    return (
        <div>
            <Header />

            <main className="container bg-light py-4">
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
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description}</p>
                                            <p className="card-text"><b>Price</b>: Rs.{item.price}</p>
                                            <button>Remove from Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CartPage;
