import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: uuid(),
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // Send POST request to backend /register endpoint
      const res = await axios.post("http://localhost:4000/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(res.data.message || "Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <section className="d-flex justify-content-center align-items-center py-4 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="card shadow-sm rounded-3">
                <div className="card-body">
                  <h2 className="text-center mb-3">Sign Up</h2>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="form-label">Enter your name:</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="email" className="form-label">Email Address:</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter mail address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <br />
                    {error && <p className="text-danger fw-bold">{error}</p>}
                    {success && <p className="text-success fw-bold">{success}</p>}
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-dark text-white">Sign Up</button>
                    </div>
                  </form>
                  <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Sign In</Link>
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

export default SignUp;
