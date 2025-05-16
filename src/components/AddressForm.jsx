import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAddresses, updateAddress } from "../redux/loginRegisterSlice";

const AddressForm = ({ address, setShowModal }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    house: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    number: "",
  });

  useEffect(() => {
    if (address) {
      setFormData({
        name: address.name || "",
        house: address.house || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
        postalCode: address.postalCode || "",
        number: address.number || "",
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: address?.id || address?._id || Date.now(),
    };

    if (address) {
      dispatch(updateAddress(payload));
    } else {
      dispatch(addAddresses(payload));
    }

    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {[
        { label: "Name", name: "name" },
        { label: "House", name: "house" },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "Country", name: "country" },
        { label: "Postal Code", name: "postalCode" },
        { label: "Mobile Number", name: "number", type: "tel" },
      ].map(({ label, name, type = "text" }) => (
        <div className="mb-3" key={name}>
          <label className="form-label">{label}</label>
          <input
            type={type}
            name={name}
            className="form-control"
            value={formData[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit" className="btn btn-primary">
        {address ? "Update Address" : "Add Address"}
      </button>
    </form>
  );
};

export default AddressForm;
