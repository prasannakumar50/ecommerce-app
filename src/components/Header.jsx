import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { useState } from "react"; 

const Header = ({ wishlist, search, setSearch }) => {
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const cartCount = cartItems.length;

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);
  };

  // Check if the current route is the home page
  const isHomePage = location.pathname === '/';

  return (
    <header className="py-2">
      <nav>
        <div className="container d-flex justify-content-between align-items-center py-2 text-dark">
          <Link className="navbar-brand fs-3" to="/">MyShoppingSite</Link>

          
          {!isHomePage && (
            <div
              className="input-with-icon mx-auto"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "260px",
              }}
            >
              <CiSearch
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#a0a0a0",
                  fontSize: "20px",
                }}
              />
              <input
                type="text"
                className="form-control"
                value={search} 
                placeholder="Search"
                onChange={e => setSearch(e.target.value)} 
                style={{
                  paddingLeft: "40px",
                  backgroundColor: "white",
                }}
              />
            </div>
          )}
          
         <div className="d-flex align-items-center gap-4">
  <Link
    to="/products"  
    className="text-decoration-none text-dark fw-bold"
    style={{ fontSize: "1rem", cursor: "pointer" }}
  >
    Products
  </Link>

  {/* Wishlist Icon with Count */}
  <div className="position-relative">
    <Link to="/wishlist">
      <MdFavoriteBorder
        style={{
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "black"
        }}
      />
      {Array.isArray(wishlist) && wishlist.length > 0 && (
        <span
          className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger"
          style={{
            fontSize: "0.8rem",
            padding: "2px 6px",
            zIndex: 1,
            left: "60%"
          }}
        >
          {wishlist.length}
        </span>
      )}
    </Link>
  </div>

  {/* Shopping Cart Icon with Count */}
  <div className="position-relative">
    <Link to="/cart">
      <LuShoppingCart
        style={{
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "black"
        }}
      />
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
    </Link>
  </div>

  {/* User Icon */}
  <div className="position-relative">
    <Link to="/login" style={{ color: "black" }}>
      <FaUserCircle style={{ fontSize: "1.7rem", cursor: "pointer" }} />
    </Link>
  </div>
</div>

        </div>
      </nav>
    </header>
  );
};


export default Header;
