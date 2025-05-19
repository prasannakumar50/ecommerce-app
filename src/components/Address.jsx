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
import { clearCart } from "../redux/cartReducer";
import { clearWishlist } from "../redux/wishlistReducer";
import { purgeStore } from "../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      return;
    }

    // Only add default address for guest user if they have no addresses
    const isGuest = user?.email === "virat@gmail.com";
    
    if (isGuest) {
      // Clear any existing addresses first to prevent duplicates
      if (addresses.length > 0) {
        addresses.forEach(addr => {
          dispatch(removeAddress(addr.id || addr._id));
        });
      }

      // Add the default guest address only if there are no addresses
      if (addresses.length === 0) {
        const defaultGuestAddress = {
          id: Date.now(),
          name: "Virat Kohli",
          house: "18",
          city: "Hyderabad",
          state: "Hyderabad",
          country: "India",
          postalCode: "110001",
          number: "123456789",
        };

        dispatch({ type: "auth/addAddress", payload: defaultGuestAddress });
      }
    }
  }, [isAuthenticated, navigate, user, addresses, dispatch]);

  const handleAddAddressClick = () => {
    setCurrentAddress(null);
    setShowModal(true);
  };

  const handleLogout = async () => {
    try {
      // Clear cart items
      dispatch(clearCart());
      // Clear wishlist items
      dispatch(clearWishlist());
      // Clear auth state
      dispatch(removeTokenFromRedux());
      dispatch(removeUserDetails());
      // Clear the guest default address flag
      localStorage.removeItem('guestDefaultAddressAdded');
      // Purge all persisted state
      await purgeStore();
      
      // Show logout success message
      toast.success("Logged out successfully", {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      });
      
      // Navigate to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Error during logout", {
        style: { backgroundColor: '#000', color: '#fff', borderRadius: '8px' }
      });
    }
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
