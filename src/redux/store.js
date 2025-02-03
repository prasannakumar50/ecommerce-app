

import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartReducer"


const store = configureStore({
    reducer:{   
        cartList: cartReducer
    }
})


export default store;