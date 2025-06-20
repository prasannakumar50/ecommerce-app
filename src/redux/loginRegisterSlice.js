import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jwt-auth-backend-taupe.vercel.app";


// Async thunk for login
export const generateToken = createAsyncThunk(
  "auth/generateToken",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, userDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Invalid credentials");
    }
  }
);

// Async thunk for signup
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Registration failed");
    }
  }
);

// Initial state
const initialState = {
  token: null,
  name: "",
  email: "",
  status: "idle",
  error: null,
  addresses: [],
  deferredCartItem: null,
  isGuest: false,
};

// Create slice
const loginRegisterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeTokenFromRedux: (state) => {
      state.token = null;
      state.name = "";
      state.email = "";
      state.isGuest = false;
      localStorage.removeItem("admin-token");
    },
    removeUserDetails: (state) => {
      state.name = "";
      state.email = "";
    },
    addAddresses: (state, action) => {
      state.addresses.push(action.payload);
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },

    // New reducers to handle deferred cart item
    setDeferredCartItem: (state, action) => {
      state.deferredCartItem = action.payload;
    },
    clearDeferredCartItem: (state) => {
      state.deferredCartItem = null;
    },

    // New reducer for guest login
    setGuestLogin: (state) => {
      state.isGuest = true;
    },
    setTokenFromStorage: (state, action) => {
    state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(generateToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        const { token, name, email } = action.payload;
        state.status = "success";
        state.token = token;
        state.name = name;
        state.email = email;
        state.error = null;
        if (!state.isGuest) {
          localStorage.setItem("admin-token", token);
        }
      })
      .addCase(generateToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Signup
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  removeTokenFromRedux,
  removeUserDetails,
  addAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setDeferredCartItem,
  clearDeferredCartItem,
  setGuestLogin,
  setTokenFromStorage,
} = loginRegisterSlice.actions;

// Export reducer
export default loginRegisterSlice.reducer;
