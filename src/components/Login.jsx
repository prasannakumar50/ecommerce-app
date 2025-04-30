import { Link } from "react-router-dom";
import Header from "./Header";
const Login = () => {
  return (
    <div>
        <Header />
      <section className="d-flex justify-content-center align-items-center py-4 bg-light ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="card shadow-sm rounded-3">
                <div className="card-body">
                  <h2 className="text-center mb-3">Sign In</h2>
                  <form>
                    <label htmlFor="emailInput" className="form-label">Email Address:</label>
                    <input
                      type="email"
                      id="emailInput"
                      className="form-control"
                      placeholder="Enter mail address"
                    />
                    <br />
                    <label htmlFor="password" className="form-label"> Password: </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                    /><br />
                    <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark text-white">Sign In</button>
                    </div>
                  </form>
                  <p className="text-center mt-3">
                    Don’t have an account? <Link to="/signup">Sign Up</Link>
                  </p>
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
