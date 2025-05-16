import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import loginRegisterReducer from './loginRegisterSlice';

const store = configureStore({
  reducer: {
    cartList: cartReducer,        
    wishlist: wishlistReducer,
    auth: loginRegisterReducer,
  },
});

export default store;
