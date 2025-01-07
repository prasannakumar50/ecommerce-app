import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";

const Header = () => (
    <header className="py-2" >
        <nav>
            <div className="container d-flex justify-content-between align-items-center py-2 text-dark">
                <h3>MyShoppingSite</h3>
                <div className="d-flex align-items-center">
                    <MdFavoriteBorder style={{ fontSize: "1.5rem", cursor: "pointer", marginRight: "1rem" }} />
                    <LuShoppingCart style={{ fontSize: "1.5rem", cursor: "pointer", marginRight: "1rem" }} />
                    <button>Login</button>
                </div>
            </div>
        </nav>
    </header>
);

export default Header;
