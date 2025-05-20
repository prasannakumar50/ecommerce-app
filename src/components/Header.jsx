import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { useState } from "react"; 

const Header = ({ wishlist, search = "", setSearch = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const token = useSelector((state) => state.auth?.token);
  const isGuest = useSelector((state) => state.auth?.isGuest);
  const cartCount = cartItems.length;

  const handleSearchChange = (event) => {
    if (typeof setSearch === 'function') {
      setSearch(event.target.value);
    }
  };

  const handleUserIconClick = () => {
    if (token || isGuest) {
      navigate('/address');
    } else {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          returnTo: '/address'
        } 
      });
    }
  };

  // Check if the current route is the home page, cart page, or wishlist page
  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';
  const isWishlistPage = location.pathname === '/wishlist';
  const shouldShowSearch = !isHomePage && !isCartPage && !isWishlistPage;

  return (
    <>
      <header className="py-2">
        <nav>
          <div className="container d-flex justify-content-between align-items-center py-2 text-dark">
            <Link className="navbar-brand fs-3" to="/">MyShoppingSite</Link>

            {/* Desktop Search - Hidden on Mobile */}
            {shouldShowSearch && (
              <div className="input-with-icon d-none d-md-block mx-auto" style={{ maxWidth: "260px" }}>
                <CiSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control"
                  value={search} 
                  placeholder="Search"
                  onChange={handleSearchChange}
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
                <FaUserCircle 
                  style={{ fontSize: "1.7rem", cursor: "pointer" }} 
                  onClick={handleUserIconClick}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Search - Only visible on mobile */}
      {shouldShowSearch && (
        <div className="mobile-search d-md-none">
          <div className="container">
            <div className="input-with-icon">
              <CiSearch className="search-icon" />
              <input
                type="text"
                className="form-control"
                value={search} 
                placeholder="Search"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
