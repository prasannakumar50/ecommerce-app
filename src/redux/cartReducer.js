const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex >= 0) {
        // Create a new array and update quantity immutably
        const updatedCartItems = state.cartItems.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 } // ✅ New object (Immutable)
            : item
        );

        return {
          ...state,
          cartItems: updatedCartItems, // ✅ New array, no direct mutation
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }], // ✅ New object
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity } // ✅ New object (Immutable)
            : item
        ),
      };

    default:
      return state;
  }
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

export default cartReducer;
