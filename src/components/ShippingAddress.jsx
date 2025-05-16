import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

const ShippingAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });

  const [addresses, setAddresses] = useState([
    {
      name: "Virat Kohli",
      street: "123 Main Street",
      city: "Hyderabad",
      zip: "001001",
      state: "Telangana",
      country: "India",
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddAddressClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: "",
      street: "",
      city: "",
      zip: "",
      state: "",
      country: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddresses((prev) => [...prev, formData]);
    setFormData({
      name: "",
      street: "",
      city: "",
      zip: "",
      state: "",
      country: "",
    });
    setShowForm(false);
    setSelectedIndex(addresses.length); // select the new one
  };

  const handleNext = () => {
    navigate("/order-summary", {
      state: {
        cartItems: location.state?.cartItems || [],
        quantities: location.state?.quantities || {},
        selectedAddress: addresses[selectedIndex],
      },
    });
  };

  return (
    <div>
      <Header />
      <main>
      <div className="container mt-5 p-4 shadow rounded" style={{ maxWidth: "400px" }}>
        <h2>Shipping Address</h2>

        <p>Choose from saved addresses:</p>
        {addresses.map((address, idx) => (
          <div
            key={idx}
            className="p-3 mb-3"
            style={{
              border: "2px solid black",
              cursor: "pointer",
              backgroundColor: selectedIndex === idx ? "#d1e7dd" : "white",
            }}
            onClick={() => setSelectedIndex(idx)}
          >
            <div><strong>{address.name}</strong></div>
            <div>{address.street}</div>
            <div>{address.city}</div>
            <div>{address.zip}</div>
            <div>{address.state}</div>
            <div>{address.country}</div>
          </div>
        ))}

        <div className="d-flex gap-3 mb-3">
          <button onClick={handleAddAddressClick} className="btn btn-dark w-100">
            Add Address
          </button>
          <button onClick={handleNext} className="btn btn-dark w-100">
            Next
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit}>
            {["name", "street", "city", "zip", "state", "country"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}

            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-dark flex-grow-1">
                Add
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary flex-grow-1">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      </main>
    </div>
  );
};

export default ShippingAddress;
