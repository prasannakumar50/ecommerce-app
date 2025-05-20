import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  generateToken,
  removeTokenFromRedux,
  removeUserDetails,
  addAddress,
  setDeferredCartItem,
  clearDeferredCartItem,
  setGuestLogin,
} from "../redux/loginRegisterSlice";
import { addToCart, clearCart } from "../redux/cartReducer";
import { addToWishlist, clearWishlist } from "../redux/wishlistReducer";
import { purgeStore } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnTo || '/address';

  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.name);
  const emailRedux = useSelector((state) => state.auth.email);
  const deferredCartItem = useSelector((state) => state.auth.deferredCartItem);

  useEffect(() => {
    if (token) {
      navigate(returnPath);
    }
  }, [token, navigate, returnPath]);

  useEffect(() => {
    if (token && deferredCartItem) {
      dispatch(addToCart(deferredCartItem));
      dispatch(clearDeferredCartItem());
      toast.success("Product added to cart after login", {
        style: { backgroundColor: "#000", color: "#fff", borderRadius: "8px" },
      });
    }
  }, [token, deferredCartItem, dispatch]);

  const handleButtonClick = async () => {
    const message = checkValidData(email, password);
    setErrorMessage(message);

    if (!message) {
      const result = await dispatch(generateToken({ email, password }));

      if (result.type === "generateToken/fulfilled") {
        navigate(returnPath);
      }
    }
  };

  const handleGuestLogin = async () => {
    dispatch(setGuestLogin());

    const guestCredentials = {
      email: "virat@gmail.com",
      password: "Virat@123",
    };

    setEmail(guestCredentials.email);
    setPassword(guestCredentials.password);

    const result = await dispatch(generateToken(guestCredentials));

    if (generateToken.fulfilled.match(result)) {
      navigate(returnPath);
    } else {
      console.error("Guest login failed");
      dispatch(removeTokenFromRedux());
    }
  };

  const handleLogout = async () => {
    try {
     
      dispatch(clearCart());
      dispatch(clearWishlist()); 
      dispatch(removeTokenFromRedux(null));
      dispatch(removeUserDetails({ name: "", email: "" }));
      setIsLoggedIn(false);
      localStorage.removeItem('guestDefaultAddressAdded');   
      await purgeStore();
      
     
      toast.success("Logged out successfully", {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      });
      
      
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Error during logout", {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      });
    }
  };

  return (
    <div>
      <ToastContainer theme="dark" autoClose={1000} />
      <Header />
      <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="card shadow-sm rounded-3">
                <div className="card-body">
                  {token ? (
                    <>
                      <h2 className="text-center mb-4">Welcome Back!</h2>
                      <div className="text-center">
                        <p>
                          <strong>Name:</strong> {name || "Guest User"}
                        </p>
                        <p>
                          <strong>Email:</strong> {emailRedux || "Not Available"}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="btn btn-dark w-100 mt-4"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-center mb-3">Sign In</h2>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="emailInput" className="form-label">
                          Email Address:
                        </label>
                        <input
                          type="email"
                          id="emailInput"
                          className="form-control"
                          placeholder="Enter mail address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label htmlFor="password" className="form-label">
                          Password:
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <p className="text-danger fw-bold">{errorMessage}</p>
                        <div className="d-grid gap-2">
                          <button
                            type="submit"
                            className="btn btn-dark text-white"
                            onClick={handleButtonClick}
                          >
                            Sign In
                          </button>
                          <button
                            className="btn btn-secondary text-uppercase"
                            onClick={handleGuestLogin}
                          >
                            Sign in as Guest
                          </button>
                        </div>
                      </form>
                      <p className="text-center mt-3">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
