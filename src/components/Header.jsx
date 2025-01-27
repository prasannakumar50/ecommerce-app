import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const Header = () => (
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

          <MdFavoriteBorder
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          />
          <LuShoppingCart
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          />
          <button>Login</button>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
