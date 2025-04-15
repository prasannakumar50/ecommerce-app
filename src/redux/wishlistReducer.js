// Action Types
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

// Action Creators
export const addToWishlist = (product) => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});

// Initial State
const initialState = {
  wishlistItems: [],
};

// Reducer Function
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      // Check if the product is already in the wishlist to avoid duplicates
      const existingProduct = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );

      // If the product already exists, don't add again
      if (existingProduct) {
        return state; // No change if already in wishlist
      }

      // Return a new state with the added product
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };

    case REMOVE_FROM_WISHLIST:
      // Remove the product by matching with its _id
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default wishlistReducer;
