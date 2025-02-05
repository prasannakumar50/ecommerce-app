import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";  

const Header = ({ wishlist }) => {
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux
  const cartCount = cartItems.length;

  return (
    <header className="py-2">
      <nav>
        <div className="container d-flex justify-content-between align-items-center py-2 text-dark">
          <Link className="navbar-brand fs-3" to="/">MyShoppingSite</Link>
          <div className="d-flex align-items-center">
            <Link
              to="/products"  
              className="text-decoration-none text-dark fw-bold me-4"
              style={{ fontSize: "1rem", cursor: "pointer" }}
            >
              Products
            </Link>

            {/* Wishlist Icon with Count */}
            <div style={{ position: "relative" }}>
              <MdFavoriteBorder
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  marginRight: "1rem",
                }}
              />
              {Array.isArray(wishlist) && wishlist.length > 0 && (
                <span
                  className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger"
                  style={{
                    fontSize: "0.8rem",
                    padding: "2px 6px",
                    zIndex: 1,
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </div>
            
            {/* Shopping Cart Icon with Count */}
            <div style={{ position: "relative" }}>
              <Link to="/cart">
                <LuShoppingCart
                  style={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginRight: "2rem",
                    color: "black",
                  }}
                />
              </Link>
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger"
                  style={{
                    fontSize: "0.8rem",
                    padding: "2px 6px",
                    zIndex: 1,
               
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>

            {/* Login Button */}
            <button className="btn btn-dark"><b>Login</b></button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
