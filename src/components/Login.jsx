import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  generateToken,
  removeTokenFromRedux,
  removeUserDetails,
  addAddress,
  setDeferredCartItem,
  clearDeferredCartItem,  // <-- import this
} from "../redux/loginRegisterSlice";
import { addToCart } from "../redux/cartReducer"; // <-- import addToCart from your cart reducer
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.name);
  const emailRedux = useSelector((state) => state.auth.email);
  const deferredCartItem = useSelector((state) => state.auth.deferredCartItem); // <-- get deferredCartItem

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    if (token) {
      navigate("/address");
    }
  }, [token, navigate]);

  // New useEffect: After login success, add deferred cart item if any
useEffect(() => {
  if (token && deferredCartItem) {
    dispatch(addToCart(deferredCartItem));
    dispatch(clearDeferredCartItem());

    toast.success("Product added to cart after login", {
      style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' },
    });
  }
}, [token]);


  const handleButtonClick = () => {
    const emailVal = email.current.value;
    const passwordVal = password.current.value;

    const message = checkValidData(emailVal, passwordVal);
    setErrorMessage(message);

    if (message === null) {
      dispatch(generateToken({ email: emailVal, password: passwordVal }));
    }
  };

  const handleGuestLogin = async () => {
    const guestCredentials = {
      email: "virat@gmail.com",
      password: "Virat@123",
    };

    if (email.current && password.current) {
      email.current.value = guestCredentials.email;
      password.current.value = guestCredentials.password;
    }

    const result = await dispatch(generateToken(guestCredentials));

    if (generateToken.fulfilled.match(result)) {
      dispatch(
        addAddress({
          id: Date.now(),
          name: "Virat Kohli",
          house: "18",
          city: "Hyderabad",
          state: "Hyderabad",
          country: "India",
          postalCode: "110001",
          number: "123456789",
        })
      );
      navigate("/address");
    } else {
      console.error("Guest login failed");
    }
  };

  const handleLogout = () => {
    dispatch(removeTokenFromRedux(null));
    dispatch(removeUserDetails({ name: "", email: "" }));
    setIsLoggedIn(false);
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
                  {isLoggedIn ? (
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
                          ref={email}
                          type="email"
                          id="emailInput"
                          className="form-control"
                          placeholder="Enter mail address"
                        />
                        <br />
                        <label htmlFor="password" className="form-label">
                          Password:
                        </label>
                        <input
                          ref={password}
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter your password"
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
                        Don’t have an account? <Link to="/signup">Sign Up</Link>
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
