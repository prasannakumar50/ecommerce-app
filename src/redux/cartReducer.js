// Initialize from localStorage
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

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      let updatedCartItems;
      if (existingProductIndex >= 0) {
        updatedCartItems = state.cartItems.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: 1 },
        ];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCartItems = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
