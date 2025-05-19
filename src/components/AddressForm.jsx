import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddresses, updateAddress } from "../redux/loginRegisterSlice";
import { toast } from "react-toastify";

const AddressForm = ({ address, setShowModal }) => {
  const dispatch = useDispatch();
  const existingAddresses = useSelector((state) => state.auth.addresses);

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

    // Check for duplicate address
    const isDuplicate = existingAddresses.some((addr) => 
      !address && // Only check for duplicates when adding new address
      addr.name === payload.name &&
      addr.house === payload.house &&
      addr.city === payload.city &&
      addr.state === payload.state &&
      addr.country === payload.country &&
      addr.postalCode === payload.postalCode &&
      addr.number === payload.number
    );

    if (isDuplicate) {
      toast.error("This address already exists!", {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      });
      return;
    }

    if (address) {
      dispatch(updateAddress(payload));
      toast.success("Address updated successfully!", {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      });
    } else {
      dispatch(addAddresses(payload));
      toast.success("Address added successfully!", {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      });
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
