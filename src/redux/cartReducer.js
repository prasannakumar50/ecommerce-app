// redux/cartReducer.js

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// Action Creators
export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const updateQuantity = (productId, quantity) => ({
  type: "UPDATE_QUANTITY",
  payload: { _id: productId, quantity },
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const resetStore = () => ({
  type: "RESET_STORE",
});

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      let updatedCart;
      if (existingProduct) {
        updatedCart = state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return {
        ...state,
        cartItems: updatedCart,
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return {
        ...state,
        cartItems: updatedCart,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return {
        ...state,
        cartItems: updatedCart,
      };
    }

    case "CLEAR_CART":
    case "RESET_STORE": {
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
