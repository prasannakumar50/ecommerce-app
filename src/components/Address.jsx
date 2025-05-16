import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaUserCircle, FaPen, FaCheck } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import AddressForm from "./AddressForm";
import Header from "./Header";

import {
  removeAddress,
  removeTokenFromRedux,
  removeUserDetails,
} from "../redux/loginRegisterSlice";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const addresses = useSelector((state) => state.auth.addresses);
  const user = useSelector((state) => state.auth.user);

  const [showModal, setShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState({ userName: false, email: false });
  const [currUser, setCurrUser] = useState(user || {});
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/address");
    }

    const isGuest = user?.email === "virat@example.com";
    if (isGuest && addresses.length === 0) {
      const defaultGuestAddress = {
        id: Date.now(),
        name: "Virat",
        house: "123",
        city: "Hyderabad",
        state: "Hyderabad",
        country: "India",
        postalCode: "100001",
        number: "123456789",
      };

      const isDuplicate = addresses.some((addr) =>
        addr.name === defaultGuestAddress.name &&
        addr.house === defaultGuestAddress.house &&
        addr.postalCode === defaultGuestAddress.postalCode
      );

      if (!isDuplicate) {
        dispatch({ type: "auth/addAddress", payload: defaultGuestAddress });
      }
    }
  }, [isAuthenticated, navigate, user, addresses, dispatch]);

  const handleAddAddressClick = () => {
    setCurrentAddress(null);
    setShowModal(true);
  };

  const handleLogout = () => {
    dispatch(removeTokenFromRedux());
    dispatch(removeUserDetails());
    navigate("/login");
  };

  const handleCloseModal = () => setShowModal(false);

  const editHandler = (address) => {
    setCurrentAddress(address);
    setShowModal(true);
  };

  const removeHandler = (id) => {
    dispatch(removeAddress(id));
  };

  const handleEditUserName = () => {
    setIsEditing({ ...isEditing, userName: true });
    setUpdatedUsername(currUser.name);
  };

  const handleSaveUsername = () => {
    setCurrUser({ ...currUser, name: updatedUsername });
    setIsEditing({ ...isEditing, userName: false });
  };

  const handleEditEmail = () => {
    setIsEditing({ ...isEditing, email: true });
    setUpdatedEmail(currUser.email);
  };

  const handleSaveEmail = () => {
    setCurrUser({ ...currUser, email: updatedEmail });
    setIsEditing({ ...isEditing, email: false });
  };

  return (
    <div>
      <Header wishlist={wishlistItems} search={search} setSearch={setSearch}/>
      <div className="container py-5">
        <div className="card p-4 shadow rounded-3">
          <h5 className="mb-3">Address List</h5>
          {addresses.length === 0 ? (
            <p className="text-muted">No addresses added yet. Click below to add one.</p>
          ) : (
            <ul className="list-group mb-4">
              {addresses.map((add) => (
                <li key={add.id || add._id} className="list-group-item">
                  <strong>{add.name}</strong>
                  <br />
                  #{add.house}, {add.city}, {add.state}, {add.country} - {add.postalCode}
                  <br />
                  Mobile: {add.number}
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-dark me-2"
                      onClick={() => editHandler(add)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeHandler(add.id || add._id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleAddAddressClick}>
              Add New Address
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentAddress ? "Edit Address" : "Add New Address"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <AddressForm address={currentAddress} setShowModal={setShowModal} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
