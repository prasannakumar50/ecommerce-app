

import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartReducer"
import wishlistReducer from "./wishlistReducer";


const store = configureStore({
    reducer:{   
        cartList: cartReducer,
        wishlist: wishlistReducer,
    }
})


export default store;